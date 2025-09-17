'use client';

import React from 'react';
import EngineeringGraph from '@/components/graph/EngineeringGraph';
import BreadcrumbsEnhanced from '@/components/ui/BreadcrumbsEnhanced';
import Header from '@/components/ui/Header';
import InfoPanel from '@/components/ui/InfoPanel';
import MajorSelector from '@/components/ui/MajorSelector';
import { useGraphState } from '@/hooks/useGraph';

export default function Home() {
  const {
    viewState,
    selectedNode,
    visibleNodes,
    visibleEdges,
    allNodes,
    navigateToHome,
    selectUniversity,
    selectMajor,
    switchUniversity,
    updateSearchTerm,
    handleNodeClick,
  } = useGraphState();

  return (
    <main className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      <Header 
        searchTerm={viewState.searchTerm} 
        onSearchChange={updateSearchTerm} 
      />
      <div className="flex-grow flex flex-col min-h-0">
        <BreadcrumbsEnhanced 
          viewState={viewState}
          allNodes={allNodes}
          onNavigateHome={navigateToHome}
          onSelectUniversity={selectUniversity}
          onSelectMajor={selectMajor}
          onSwitchUniversity={switchUniversity}
        />
        <div className="flex-grow flex min-h-0 px-6 py-4 gap-6">
          <div className="flex-1 bg-gray-800 rounded-lg p-4 shadow-xl min-h-0">
            <EngineeringGraph 
              visibleNodes={visibleNodes}
              visibleEdges={visibleEdges}
              selectedNodeId={selectedNode?.id || null}
              onNodeClick={handleNodeClick}
              viewState={viewState}
            />
          </div>
          <div className="w-96 bg-gray-800 rounded-lg shadow-xl min-h-0 flex flex-col">
            <MajorSelector 
              selectedMajorId={viewState.selectedMajorId}
              onMajorClick={selectMajor}
            />
            <InfoPanel selectedNode={selectedNode} />
          </div>
        </div>
      </div>
    </main>
  );
}
