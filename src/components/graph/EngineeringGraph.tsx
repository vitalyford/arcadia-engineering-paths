'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { ExtendedGraphNode, GraphEdge, GraphViewState, calculateClusterPosition } from '@/lib/graph-utils';
import { useNodePositions } from '@/hooks/useGraph';
import Node from './Node';
import Edge from './Edge';

interface EngineeringGraphProps {
  visibleNodes: ExtendedGraphNode[];
  visibleEdges: GraphEdge[];
  selectedNodeId: string | null;
  onNodeClick: (nodeId: string) => void;
  viewState: GraphViewState;
}

const EngineeringGraph: React.FC<EngineeringGraphProps> = ({ 
  visibleNodes, 
  visibleEdges, 
  selectedNodeId, 
  onNodeClick,
  viewState 
}) => {
  const [transform, setTransform] = useState(d3.zoomIdentity);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 700 });
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<ExtendedGraphNode, undefined> | null>(null);
  
  const { positions, updateNodePosition, setPositions } = useNodePositions(visibleNodes);

  // Update dimensions based on container
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const container = svgRef.current.parentElement;
        if (container) {
          const rect = container.getBoundingClientRect();
          setDimensions({
            width: Math.max(800, rect.width - 32),
            height: Math.max(500, rect.height - 32)
          });
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Create and update force simulation
  useEffect(() => {
    if (visibleNodes.length === 0) return;

    const { width, height } = dimensions;

    // Convert visible edges to d3 links format
    const links = visibleEdges.map(edge => ({
      source: visibleNodes.find(n => n.id === edge.sourceId)!,
      target: visibleNodes.find(n => n.id === edge.targetId)!,
    })).filter(link => link.source && link.target);

    // Create node copies with current positions
    const nodesCopy = visibleNodes.map(node => {
      const pos = positions.get(node.id);
      return {
        ...node,
        x: pos?.x ?? node.x ?? Math.random() * width,
        y: pos?.y ?? node.y ?? Math.random() * height,
      };
    });

    // Initialize positions for new nodes based on view mode
    nodesCopy.forEach((node) => {
      if (!positions.has(node.id)) {
        if (viewState.mode === 'overview') {
          // Cluster by type in overview mode
          if (node.type === 'university') {
            const universityIndex = nodesCopy.filter(n => n.type === 'university').indexOf(node);
            const totalUniversities = nodesCopy.filter(n => n.type === 'university').length;
            const pos = calculateClusterPosition(width * 0.7, height * 0.5, universityIndex, totalUniversities, 150);
            node.x = pos.x;
            node.y = pos.y;
          } else if (node.type === 'major') {
            const majorIndex = nodesCopy.filter(n => n.type === 'major').indexOf(node);
            const totalMajors = nodesCopy.filter(n => n.type === 'major').length;
            const pos = calculateClusterPosition(width * 0.3, height * 0.5, majorIndex, totalMajors, 100);
            node.x = pos.x;
            node.y = pos.y;
          }
        } else {
          // University-focused mode: cluster universities, highlight selected one, cluster programs
          if (node.type === 'university') {
            const universityIndex = nodesCopy.filter(n => n.type === 'university').indexOf(node);
            const totalUniversities = nodesCopy.filter(n => n.type === 'university').length;
            
            // If this is the selected university, place it more prominently
            if (node.id === viewState.selectedUniversityId) {
              node.x = width * 0.25;
              node.y = height * 0.5;
            } else {
              // Cluster other universities around the selected one
              const pos = calculateClusterPosition(width * 0.25, height * 0.3, universityIndex, totalUniversities - 1, 100);
              node.x = pos.x;
              node.y = pos.y;
            }
          } else if (node.type === 'program') {
            const programIndex = nodesCopy.filter(n => n.type === 'program').indexOf(node);
            const totalPrograms = nodesCopy.filter(n => n.type === 'program').length;
            const pos = calculateClusterPosition(width * 0.7, height * 0.5, programIndex, totalPrograms, 120);
            node.x = pos.x;
            node.y = pos.y;
          } else if (node.type === 'major') {
            const majorIndex = nodesCopy.filter(n => n.type === 'major').indexOf(node);
            const totalMajors = nodesCopy.filter(n => n.type === 'major').length;
            const pos = calculateClusterPosition(width * 0.15, height * 0.5, majorIndex, totalMajors, 80);
            node.x = pos.x;
            node.y = pos.y;
          }
        }
      }
    });

    // Stop existing simulation
    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    // Create new simulation
    const simulation = d3.forceSimulation(nodesCopy)
      .force('link', d3.forceLink(links).id((d: d3.SimulationNodeDatum) => (d as ExtendedGraphNode).id).distance(120).strength(0.6))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05));

    simulation.on('tick', () => {
      // Update positions map with simulation results
      const newPositions = new Map();
      nodesCopy.forEach(node => {
        newPositions.set(node.id, { x: node.x!, y: node.y! });
      });
      setPositions(newPositions);
    });

    simulationRef.current = simulation;

    return () => {
      simulation.stop();
    };
  }, [visibleNodes, visibleEdges, dimensions, viewState.mode, viewState.selectedUniversityId, positions, setPositions]);

  // Setup zoom behavior
  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        setTransform(event.transform);
      });

    d3.select(svgElement).call(zoom);

    return () => {
      d3.select(svgElement).on('.zoom', null);
    };
  }, []);

  // Handle node drag with simulation synchronization
  const handleNodeDrag = useCallback((nodeId: string, newX: number, newY: number) => {
    updateNodePosition(nodeId, newX, newY);
    
    // Update simulation node position if simulation exists
    if (simulationRef.current) {
      const node = simulationRef.current.nodes().find(n => n.id === nodeId);
      if (node) {
        node.fx = newX; // Fix position during drag
        node.fy = newY;
        simulationRef.current.alpha(0.3).restart(); // Restart with low alpha
      }
    }
  }, [updateNodePosition]);

  const handleNodeDragEnd = useCallback((nodeId: string) => {
    // Release fixed position after drag
    if (simulationRef.current) {
      const node = simulationRef.current.nodes().find(n => n.id === nodeId);
      if (node) {
        node.fx = null;
        node.fy = null;
      }
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg 
        ref={svgRef} 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} 
        className="border border-gray-600 rounded-lg bg-gray-900"
      >
        <defs>
          <linearGradient id="majorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: "#06b6d4", stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: "#0891b2", stopOpacity: 1}} />
          </linearGradient>
          <linearGradient id="universityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: "#14b8a6", stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: "#0f766e", stopOpacity: 1}} />
          </linearGradient>
          <linearGradient id="programGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: "#6366f1", stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: "#4f46e5", stopOpacity: 1}} />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        
        <g transform={transform.toString()}>
          {/* Render edges first (behind nodes) */}
          {visibleEdges.map((edge, i) => {
            const sourcePos = positions.get(edge.sourceId);
            const targetPos = positions.get(edge.targetId);
            
            if (!sourcePos || !targetPos) return null;
            
            return (
              <Edge 
                key={`${edge.sourceId}-${edge.targetId}-${i}`}
                source={sourcePos}
                target={targetPos}
              />
            );
          })}
          
          {/* Render nodes */}
          {visibleNodes.map((node) => {
            const pos = positions.get(node.id);
            if (!pos) return null;
            
            return (
              <Node 
                key={node.id}
                id={node.id}
                name={node.name}
                x={pos.x}
                y={pos.y}
                type={node.type}
                onClick={() => onNodeClick(node.id)}
                selected={selectedNodeId === node.id}
                onDrag={handleNodeDrag}
                onDragEnd={handleNodeDragEnd}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

EngineeringGraph.displayName = 'EngineeringGraph';

export default EngineeringGraph;