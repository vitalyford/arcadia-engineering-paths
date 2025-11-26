'use client';

import React, { useState } from 'react';
import MillerColumns from '@/components/ui/MillerColumns';
import PreEngineeringRequirements from '@/components/ui/PreEngineeringRequirements';
import ProgramCompare from '@/components/ui/ProgramCompare';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import PhysicsBackground from '@/components/ui/PhysicsBackground';
import { useSearchState } from '@/hooks/useSearch';
import { PartnerUniversity, PartnerProgram } from '@/data/engineering-paths';

interface ProgramOption {
    university: PartnerUniversity;
    program: PartnerProgram;
}

interface SelectedState {
    university: PartnerUniversity | null;
    program: PartnerProgram | null;
}

export default function Home() {
  const { searchTerm, updateSearchTerm } = useSearchState();
  const [activeView, setActiveView] = useState<'pathways' | 'requirements' | 'compare'>('pathways');

  // Miller Columns state
  const [millerSelected, setMillerSelected] = useState<SelectedState>({
    university: null,
    program: null,
  });
  const [mobileColumn, setMobileColumn] = useState<'universities' | 'programs' | 'details'>('universities');

  // Program Compare state
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([]);

  const handleViewChange = (view: 'pathways' | 'requirements' | 'compare') => {
    setActiveView(view);
    // Clear search term when switching away from pathways view
    if (view !== 'pathways' && searchTerm) {
      updateSearchTerm('');
    }
  };

  const handleProgramSelect = (option: ProgramOption) => {
    if (selectedPrograms.length < 3) {
      setSelectedPrograms([...selectedPrograms, option]);
    }
  };

  const handleProgramRemove = (index: number) => {
    setSelectedPrograms(selectedPrograms.filter((_, i) => i !== index));
  };

  return (
    <main className="h-screen flex flex-col bg-gray-50 overflow-hidden relative">
      <PhysicsBackground />
      <div className="relative z-10">
        <Header
          searchTerm={searchTerm}
          onSearchChange={updateSearchTerm}
          activeView={activeView}
          onViewChange={handleViewChange}
        />
      </div>
      <div className="flex-1 flex flex-col min-h-0 relative z-10">
        {activeView === 'pathways' ? (
          <div className="flex-1 px-2 py-2 md:px-6 md:py-6 min-h-0">
            <MillerColumns
              searchTerm={searchTerm}
              selected={millerSelected}
              onSelectedChange={setMillerSelected}
              mobileColumn={mobileColumn}
              onMobileColumnChange={setMobileColumn}
            />
          </div>
        ) : activeView === 'compare' ? (
          <div className="flex-1 px-2 py-2 md:px-6 md:py-6 min-h-0 overflow-auto">
            <ProgramCompare
              selectedPrograms={selectedPrograms}
              onProgramSelect={handleProgramSelect}
              onProgramRemove={handleProgramRemove}
            />
          </div>
        ) : (
          <div className="flex-1 px-2 pb-2 md:px-6 md:pb-6 min-h-0 overflow-auto">
            <PreEngineeringRequirements />
          </div>
        )}
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
