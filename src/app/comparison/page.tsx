'use client';

import React, { useState } from 'react';
import EngineeringGraph from '@/components/graph/EngineeringGraph';
import MillerColumns from '@/components/ui/MillerColumns';
import Header from '@/components/ui/Header';
import { useGraphState } from '@/hooks/useGraph';

type ViewMode = 'graph' | 'miller' | 'split';

export default function ComparisonView() {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const {
    viewState,
    selectedNode,
    visibleNodes,
    visibleEdges,
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
        {/* Mode Selector */}
        <div className="px-6 pt-4">
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-white mb-3">🔍 Interface Comparison</h2>
            <div className="flex gap-3 mb-3">
              <button
                onClick={() => setViewMode('graph')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  viewMode === 'graph' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                📊 Current Graph View
              </button>
              <button
                onClick={() => setViewMode('miller')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  viewMode === 'miller' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                📋 New Miller Columns
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  viewMode === 'split' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                🔄 Side-by-Side
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <h3 className="font-semibold text-cyan-400 mb-1">📊 Graph Approach</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Shows all connections visually</li>
                  <li>• D3 force simulation layout</li>
                  <li>• Can feel overwhelming with many nodes</li>
                  <li>• Good for exploring relationships</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-400 mb-1">📋 Miller Columns</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Progressive disclosure (step-by-step)</li>
                  <li>• Familiar navigation pattern</li>
                  <li>• Reduces cognitive load</li>
                  <li>• Better for focused decision-making</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow px-6 pb-6">
          {viewMode === 'graph' && (
            <div className="h-full bg-gray-800 rounded-lg p-4 shadow-xl">
              <EngineeringGraph 
                visibleNodes={visibleNodes}
                visibleEdges={visibleEdges}
                selectedNodeId={selectedNode?.id || null}
                onNodeClick={handleNodeClick}
                viewState={viewState}
              />
            </div>
          )}
          
          {viewMode === 'miller' && (
            <MillerColumns searchTerm={viewState.searchTerm} />
          )}
          
          {viewMode === 'split' && (
            <div className="h-full flex gap-4">
              <div className="flex-1 flex flex-col">
                <h3 className="text-white font-semibold mb-2 px-2">📊 Current Graph Approach</h3>
                <div className="flex-1 bg-gray-800 rounded-lg p-4 shadow-xl">
                  <EngineeringGraph 
                    visibleNodes={visibleNodes}
                    visibleEdges={visibleEdges}
                    selectedNodeId={selectedNode?.id || null}
                    onNodeClick={handleNodeClick}
                    viewState={viewState}
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-white font-semibold mb-2 px-2">📋 New Miller Columns</h3>
                <div className="flex-1">
                  <MillerColumns searchTerm={viewState.searchTerm} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}