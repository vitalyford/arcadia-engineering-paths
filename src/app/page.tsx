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
        {/* Quick Navigation */}
        <div className="px-6 pt-4">
          <div className="bg-purple-900/50 border border-purple-700 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-purple-300 mb-2">🚀 Try the New Interface!</h2>
            <p className="text-purple-200 text-sm mb-3">
              We&apos;ve reimagined how to explore university programs with a cleaner, more intuitive approach.
            </p>
            <div className="flex gap-2">
              <a 
                href="/miller-demo" 
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                📋 Try Miller Columns
              </a>
              <a 
                href="/comparison" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                🔄 Compare Both Views
              </a>
            </div>
          </div>
        </div>
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
