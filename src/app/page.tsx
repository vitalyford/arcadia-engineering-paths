'use client';

import React, { useState } from 'react';
import MillerColumns from '@/components/ui/MillerColumns';
import PreEngineeringRequirements from '@/components/ui/PreEngineeringRequirements';
import ProgramCompare from '@/components/ui/ProgramCompare';
import Header from '@/components/ui/Header';
import { useSearchState } from '@/hooks/useSearch';

export default function Home() {
  const { searchTerm, updateSearchTerm } = useSearchState();
  const [activeView, setActiveView] = useState<'pathways' | 'requirements' | 'compare'>('pathways');

  return (
    <main className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      <Header
        searchTerm={searchTerm}
        onSearchChange={updateSearchTerm}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <div className="flex-1 flex flex-col min-h-0">
        {activeView === 'pathways' ? (
          <div className="flex-1 px-6 py-6 min-h-0">
            <MillerColumns searchTerm={searchTerm} />
          </div>
        ) : activeView === 'compare' ? (
          <div className="flex-1 px-6 py-6 min-h-0 overflow-auto">
            <ProgramCompare />
          </div>
        ) : (
          <div className="flex-1 px-6 pb-6 min-h-0 overflow-auto">
            <PreEngineeringRequirements />
          </div>
        )}
      </div>
    </main>
  );
}
