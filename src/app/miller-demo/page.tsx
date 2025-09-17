'use client';

import React from 'react';
import MillerColumns from '@/components/ui/MillerColumns';
import Header from '@/components/ui/Header';
import { useGraphState } from '@/hooks/useGraph';

export default function MillerColumnsDemo() {
  const {
    viewState,
    updateSearchTerm,
  } = useGraphState();

  return (
    <main className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      <Header 
        searchTerm={viewState.searchTerm} 
        onSearchChange={updateSearchTerm} 
      />
      <div className="flex-grow flex flex-col min-h-0">
        <div className="px-6 pt-4">
          <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-blue-300 mb-2">🔄 New Miller Columns Interface</h2>
            <p className="text-blue-200 text-sm">
              This is a demonstration of the new progressive disclosure interface. 
              Select a university → choose a program → view requirements. 
              Much simpler than the complex graph!
            </p>
          </div>
        </div>
        <div className="flex-grow px-6 pb-6">
          <MillerColumns searchTerm={viewState.searchTerm} />
        </div>
      </div>
    </main>
  );
}