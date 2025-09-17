import { ArcadiaMajor, PartnerUniversity, PartnerProgram } from '@/data/engineering-paths';

// Core graph node interface - the primitive data type that flows through the system
export interface GraphNode {
  id: string;
  name: string;
  x: number;
  y: number;
  type: 'major' | 'university' | 'program';
  universityId?: string; // For programs, links to their parent university
}

// Extended node with optional metadata and D3 simulation properties
export interface ExtendedGraphNode extends GraphNode {
  description?: string;
  courses?: string[];
  requirements?: string[] | { gpa: string; notes: string };
  programs?: PartnerProgram[];
  arcadiaMajorIds?: string[];
  degreeTypes?: string[];
  // D3 simulation properties
  fx?: number | null;
  fy?: number | null;
  vx?: number;
  vy?: number;
  index?: number;
}

// Graph view state - controls what's visible and how
export interface GraphViewState {
  mode: 'overview' | 'university-focused';
  selectedUniversityId: string | null;
  selectedMajorId: string | null;
  expandedUniversities: Set<string>;
  visibleNodeIds: Set<string>;
  searchTerm: string;
}

// Edge representation for connections between nodes
export interface GraphEdge {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'major-to-university' | 'university-to-program';
}

// Complete graph data structure
export interface GraphData {
  nodes: Map<string, ExtendedGraphNode>;
  edges: Map<string, GraphEdge>;
  viewState: GraphViewState;
}

// Graph operation results for UI feedback
export interface GraphOperationResult {
  success: boolean;
  message?: string;
  updatedNodes?: Set<string>;
  updatedEdges?: Set<string>;
}

// Viewport and layout configuration
export interface GraphLayout {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  nodeSpacing: number;
  clusterRadius: number;
}

// Factory functions for creating nodes from data sources
export const createGraphNodeFromMajor = (major: ArcadiaMajor, x = 0, y = 0): ExtendedGraphNode => ({
  id: major.id,
  name: major.name,
  x,
  y,
  type: 'major',
  description: major.description,
  courses: major.courses,
  degreeTypes: major.degreeTypes,
});

export const createGraphNodeFromUniversity = (university: PartnerUniversity, x = 0, y = 0): ExtendedGraphNode => ({
  id: university.id,
  name: university.name,
  x,
  y,
  type: 'university',
  programs: university.programs,
  requirements: university.requirements,
});

export const createGraphNodeFromProgram = (program: PartnerProgram, universityId: string, x = 0, y = 0): ExtendedGraphNode => ({
  id: program.id,
  name: program.name,
  x,
  y,
  type: 'program',
  universityId,
  requirements: program.requirements,
  arcadiaMajorIds: program.arcadiaMajorIds,
});

// Initial view state factory
export const createInitialViewState = (): GraphViewState => ({
  mode: 'overview',
  selectedUniversityId: null,
  selectedMajorId: null,
  expandedUniversities: new Set(),
  visibleNodeIds: new Set(),
  searchTerm: '',
});

// Utility functions for graph operations
export const isNodeVisible = (node: ExtendedGraphNode, viewState: GraphViewState): boolean => {
  // Search filtering
  if (viewState.searchTerm) {
    const searchLower = viewState.searchTerm.toLowerCase();
    const nameMatch = node.name.toLowerCase().includes(searchLower);
    const descriptionMatch = node.description?.toLowerCase().includes(searchLower);
    const coursesMatch = node.courses?.some(course => course.toLowerCase().includes(searchLower));
    
    if (!nameMatch && !descriptionMatch && !coursesMatch) {
      return false;
    }
  }

  // View mode filtering
  switch (viewState.mode) {
    case 'overview':
      // Show only universities and Arcadia majors
      return node.type === 'university' || node.type === 'major';
    
    case 'university-focused':
      // Show ALL universities, programs from selected university, and all Arcadia majors
      if (node.type === 'university') {
        return true; // Show all universities, not just the selected one
      }
      if (node.type === 'program') {
        return node.universityId === viewState.selectedUniversityId;
      }
      if (node.type === 'major') {
        // Show all Arcadia majors (they should always be visible)
        return true;
      }
      return false;
    
    default:
      return true;
  }
};

export const getConnectedMajorIds = (universityId: string, allNodes: Map<string, ExtendedGraphNode>): string[] => {
  const connectedMajors = new Set<string>();
  
  // Find all programs for this university
  for (const node of allNodes.values()) {
    if (node.type === 'program' && node.universityId === universityId && node.arcadiaMajorIds) {
      node.arcadiaMajorIds.forEach(majorId => connectedMajors.add(majorId));
    }
  }
  
  return Array.from(connectedMajors);
};

// Navigation helpers for breadcrumbs
export interface BreadcrumbItem {
  id: string;
  name: string;
  type: 'home' | 'university' | 'major';
  clickable: boolean;
}

export const generateBreadcrumbs = (viewState: GraphViewState, allNodes: Map<string, ExtendedGraphNode>): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { id: 'home', name: 'Home', type: 'home', clickable: true }
  ];

  if (viewState.selectedUniversityId) {
    const university = allNodes.get(viewState.selectedUniversityId);
    if (university) {
      breadcrumbs.push({
        id: university.id,
        name: university.name,
        type: 'university',
        clickable: true
      });
    }
  }

  if (viewState.selectedMajorId) {
    const major = allNodes.get(viewState.selectedMajorId);
    if (major) {
      breadcrumbs.push({
        id: major.id,
        name: major.name,
        type: 'major',
        clickable: true
      });
    }
  }

  return breadcrumbs;
};

// Position calculation utilities for force-directed layout
export const calculateClusterPosition = (
  centerX: number,
  centerY: number,
  index: number,
  total: number,
  radius: number
): { x: number; y: number } => {
  if (total === 1) {
    return { x: centerX, y: centerY };
  }
  
  const angle = (2 * Math.PI * index) / total;
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius
  };
};

export const calculateNodeDistance = (node1: GraphNode, node2: GraphNode): number => {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  return Math.sqrt(dx * dx + dy * dy);
};