
'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { arcadiaMajors, partnerUniversities, ArcadiaMajor, PartnerUniversity, PartnerProgram } from '@/data/engineering-paths';
import Node from './Node';
import Edge, { EdgeProps } from './Edge';

type GraphNode = (ArcadiaMajor | PartnerUniversity | PartnerProgram) & { 
  x: number; 
  y: number; 
  type: 'major' | 'university' | 'program';
  universityId?: string;
};

interface EngineeringGraphProps {
  selectedNode: GraphNode | null;
  onNodeClick: (node: GraphNode | null) => void;
  searchTerm?: string;
}

const EngineeringGraph: React.FC<EngineeringGraphProps> = ({ selectedNode, onNodeClick, searchTerm = '' }) => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<EdgeProps[]>([]);
  const [transform, setTransform] = useState(d3.zoomIdentity);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = 1200;
    const height = 800;

    const majorNodes: GraphNode[] = arcadiaMajors.map(major => ({ 
      ...major, 
      type: 'major' as const, 
      x: Math.random() * width, 
      y: Math.random() * height 
    }));
    
    const universityNodes: GraphNode[] = partnerUniversities.map(uni => ({ 
      ...uni, 
      type: 'university' as const, 
      x: Math.random() * width, 
      y: Math.random() * height 
    }));
    
    const programNodes: GraphNode[] = partnerUniversities.flatMap(uni => 
      uni.programs.map(program => ({ 
        ...program, 
        universityId: uni.id, 
        type: 'program' as const, 
        x: Math.random() * width, 
        y: Math.random() * height 
      }))
    );

    const allNodes: GraphNode[] = [...majorNodes, ...universityNodes, ...programNodes];

    const allEdges: EdgeProps[] = [];
    // Edges from majors to universities
    partnerUniversities.forEach(uni => {
        uni.programs.forEach(program => {
            program.arcadiaMajorIds.forEach(majorId => {
                const majorNode = allNodes.find(n => n.id === majorId);
                const universityNode = allNodes.find(n => n.id === uni.id);
                if (majorNode && universityNode) {
                    allEdges.push({ source: majorNode, target: universityNode });
                }
            });
        });
    });

    // Edges from universities to programs
    programNodes.forEach(programNode => {
        const universityNode = allNodes.find(n => n.id === programNode.universityId);
        if (universityNode) {
            allEdges.push({ source: universityNode, target: programNode });
        }
    });

    setNodes(allNodes);
    setEdges(allEdges);

    const newSimulation = d3.forceSimulation(allNodes)
      .force('link', d3.forceLink(allEdges).id((d) => (d as GraphNode).id).distance(150).strength(0.8))
      .force('charge', d3.forceManyBody().strength(-800))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50))
      .force('x', d3.forceX(width / 2).strength(0.1))
      .force('y', d3.forceY(height / 2).strength(0.1));

    newSimulation.on('tick', () => {
      setNodes([...newSimulation.nodes()]);
    });

    const zoom = d3.zoom<SVGSVGElement, unknown>().on('zoom', (event) => {
      setTransform(event.transform);
    });

    if (svgRef.current) {
      d3.select(svgRef.current).call(zoom);
    }

    return () => {
      newSimulation.stop();
    };
  }, []);

  const filteredNodes = searchTerm 
    ? nodes.filter(node => 
        node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ('description' in node && node.description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        ('courses' in node && node.courses?.some(course => 
          course.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      )
    : nodes;

  const filteredEdges = searchTerm
    ? edges.filter(edge => {
        const sourceMatch = filteredNodes.some(n => n.id === (edge.source as GraphNode).id);
        const targetMatch = filteredNodes.some(n => n.id === (edge.target as GraphNode).id);
        return sourceMatch && targetMatch;
      })
    : edges;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg ref={svgRef} width="100%" height="700" viewBox="0 0 1200 700" className="border border-gray-600 rounded-lg bg-gray-900">
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
          {filteredEdges.map((edge, i) => (
            <Edge key={i} source={edge.source} target={edge.target} />
          ))}
        </g>
        <g transform={transform.toString()}>
          {filteredNodes.map((node) => (
            <Node 
              key={node.id} 
              id={node.id}
              name={node.name}
              x={node.x}
              y={node.y}
              type={node.type}
              onClick={() => onNodeClick(node)} 
              selected={selectedNode?.id === node.id}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

EngineeringGraph.displayName = 'EngineeringGraph';

export default EngineeringGraph;
