'use client';

import React, { useState } from 'react';
import MillerColumns from '@/components/ui/MillerColumns';
import PreEngineeringRequirements from '@/components/ui/PreEngineeringRequirements';
import Header from '@/components/ui/Header';
import { useSearchState } from '@/hooks/useSearch';

export default function Home() {
  const { searchTerm, updateSearchTerm } = useSearchState();
  const [activeView, setActiveView] = useState<'pathways' | 'requirements'>('pathways');

  return (
    <main className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={updateSearchTerm}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 px-6 py-6 min-h-0 overflow-auto">
          {activeView === 'pathways' ? (
            <MillerColumns searchTerm={searchTerm} />
          ) : (
            <PreEngineeringRequirements />
          )}
        </div>
      </div>
    </main>
  );
}
