import { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  GraphData, 
  GraphViewState, 
  ExtendedGraphNode, 
  GraphEdge,
  createInitialViewState,
  createGraphNodeFromMajor,
  createGraphNodeFromUniversity,
  createGraphNodeFromProgram,
  isNodeVisible,
  getConnectedMajorIds
} from '@/lib/graph-utils';
import { arcadiaMajors, partnerUniversities } from '@/data/engineering-paths';

// Custom hook for managing graph state and operations
export const useGraphState = () => {
  const [viewState, setViewState] = useState<GraphViewState>(createInitialViewState);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Initialize graph data from static sources
  const graphData = useMemo<GraphData>(() => {
    const nodes = new Map<string, ExtendedGraphNode>();
    const edges = new Map<string, GraphEdge>();

    // Add major nodes
    arcadiaMajors.forEach(major => {
      nodes.set(major.id, createGraphNodeFromMajor(major));
    });

    // Add university nodes and their programs
    partnerUniversities.forEach(university => {
      nodes.set(university.id, createGraphNodeFromUniversity(university));
      
      // Add program nodes
      university.programs.forEach(program => {
        nodes.set(program.id, createGraphNodeFromProgram(program, university.id));
        
        // Create edges from university to program
        const edgeId = `${university.id}-${program.id}`;
        edges.set(edgeId, {
          id: edgeId,
          sourceId: university.id,
          targetId: program.id,
          type: 'university-to-program'
        });

        // Create edges from majors to university (via programs)
        program.arcadiaMajorIds.forEach(majorId => {
          const majorToUniEdgeId = `${majorId}-${university.id}`;
          if (!edges.has(majorToUniEdgeId)) {
            edges.set(majorToUniEdgeId, {
              id: majorToUniEdgeId,
              sourceId: majorId,
              targetId: university.id,
              type: 'major-to-university'
            });
          }
        });
      });
    });

    return { nodes, edges, viewState };
  }, [viewState]);

  // Get visible nodes based on current view state
  const visibleNodes = useMemo(() => {
    return Array.from(graphData.nodes.values()).filter(node => 
      isNodeVisible(node, viewState)
    );
  }, [graphData.nodes, viewState]);

  // Get visible edges based on visible nodes
  const visibleEdges = useMemo(() => {
    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
    return Array.from(graphData.edges.values()).filter(edge => 
      visibleNodeIds.has(edge.sourceId) && visibleNodeIds.has(edge.targetId)
    );
  }, [graphData.edges, visibleNodes]);

  // Navigation actions
  const navigateToHome = useCallback(() => {
    setViewState(createInitialViewState());
    setSelectedNodeId(null);
  }, []);

  const selectUniversity = useCallback((universityId: string) => {
    const connectedMajorIds = getConnectedMajorIds(universityId, graphData.nodes);
    
    setViewState(prev => ({
      ...prev,
      mode: 'university-focused',
      selectedUniversityId: universityId,
      selectedMajorId: null,
      expandedUniversities: new Set([universityId]),
      visibleNodeIds: new Set(connectedMajorIds)
    }));
    setSelectedNodeId(universityId);
  }, [graphData.nodes]);

  const selectMajor = useCallback((majorId: string, universityId?: string) => {
    setViewState(prev => ({
      ...prev,
      selectedMajorId: majorId,
      selectedUniversityId: universityId || prev.selectedUniversityId
    }));
    setSelectedNodeId(majorId);
  }, []);

  const switchUniversity = useCallback((newUniversityId: string, currentMajorId?: string) => {
    const connectedMajorIds = getConnectedMajorIds(newUniversityId, graphData.nodes);
    
    // Check if current major exists in new university
    const majorExistsInNewUni = currentMajorId && connectedMajorIds.includes(currentMajorId);
    
    setViewState(prev => ({
      ...prev,
      selectedUniversityId: newUniversityId,
      selectedMajorId: majorExistsInNewUni ? currentMajorId! : null,
      expandedUniversities: new Set([newUniversityId]),
      visibleNodeIds: new Set(connectedMajorIds)
    }));
    
    setSelectedNodeId(majorExistsInNewUni ? currentMajorId! : newUniversityId);
  }, [graphData.nodes]);

  const updateSearchTerm = useCallback((searchTerm: string) => {
    setViewState(prev => ({
      ...prev,
      searchTerm
    }));
  }, []);

  // Node click handler
  const handleNodeClick = useCallback((nodeId: string) => {
    const node = graphData.nodes.get(nodeId);
    if (!node) return;

    switch (node.type) {
      case 'university':
        // Always call selectUniversity when clicking on a university
        // This will switch to that university regardless of current mode
        selectUniversity(nodeId);
        break;
      case 'major':
        selectMajor(nodeId, viewState.selectedUniversityId || undefined);
        break;
      case 'program':
        setSelectedNodeId(nodeId);
        break;
    }
  }, [graphData.nodes, viewState.selectedUniversityId, selectUniversity, selectMajor]);

  return {
    // State
    viewState,
    selectedNodeId,
    selectedNode: selectedNodeId ? graphData.nodes.get(selectedNodeId) || null : null,
    visibleNodes,
    visibleEdges,
    allNodes: graphData.nodes,
    allEdges: graphData.edges,
    
    // Actions
    navigateToHome,
    selectUniversity,
    selectMajor,
    switchUniversity,
    updateSearchTerm,
    handleNodeClick,
    setSelectedNodeId
  };
};

// Hook for managing node positions with D3 integration
export const useNodePositions = (nodes: ExtendedGraphNode[]) => {
  const [positions, setPositions] = useState<Map<string, { x: number; y: number }>>(new Map());

  const updateNodePosition = useCallback((nodeId: string, x: number, y: number) => {
    setPositions(prev => new Map(prev.set(nodeId, { x, y })));
  }, []);

  const getNodePosition = useCallback((nodeId: string) => {
    return positions.get(nodeId) || { x: 0, y: 0 };
  }, [positions]);

  // Initialize positions for new nodes
  useEffect(() => {
    nodes.forEach(node => {
      if (!positions.has(node.id)) {
        setPositions(prev => new Map(prev.set(node.id, { x: node.x, y: node.y })));
      }
    });
  }, [nodes, positions]);

  return {
    positions,
    updateNodePosition,
    getNodePosition,
    setPositions
  };
};