'use client';

import React, { useState } from 'react';
import EngineeringGraph from '@/components/graph/EngineeringGraph';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Header from '@/components/ui/Header';
import InfoPanel from '@/components/ui/InfoPanel';
import { ArcadiaMajor, PartnerUniversity, PartnerProgram } from '@/data/engineering-paths';

type GraphNode = (ArcadiaMajor | PartnerUniversity | PartnerProgram) & { 
  x: number; 
  y: number; 
  type: 'major' | 'university' | 'program';
  universityId?: string;
};

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleNodeSelect = (node: (ArcadiaMajor | PartnerUniversity | PartnerProgram) & { x?: number; y?: number, type?: string } | null) => {
    if (node === null) {
      setSelectedNode(null);
    } else {
      // Convert the node to GraphNode format
      const graphNode: GraphNode = {
        ...node,
        x: node.x || Math.random() * 1200,
        y: node.y || Math.random() * 800,
        type: node.type as 'major' | 'university' | 'program'
      };
      setSelectedNode(graphNode);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-900">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="flex-grow flex flex-col w-full">
        <Breadcrumbs selectedNode={selectedNode} onNodeSelect={handleNodeSelect} />
        <div className="flex-grow flex w-full px-6 py-4 gap-6">
          <div className="flex-1 bg-gray-800 rounded-lg p-4 shadow-xl">
            <EngineeringGraph selectedNode={selectedNode} onNodeClick={setSelectedNode} searchTerm={searchTerm} />
          </div>
          <div className="w-96 bg-gray-800 rounded-lg shadow-xl">
            <InfoPanel selectedNode={selectedNode} />
          </div>
        </div>
      </div>
    </main>
  );
}
