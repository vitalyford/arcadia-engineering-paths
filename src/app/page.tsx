'use client';

import React from 'react';
import MillerColumns from '@/components/ui/MillerColumns';
import Header from '@/components/ui/Header';
import { useSearchState } from '@/hooks/useSearch';

export default function Home() {
  const { searchTerm, updateSearchTerm } = useSearchState();

  return (
    <main className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={updateSearchTerm} 
      />
      <div className="flex-grow flex flex-col min-h-0">
        <div className="flex-grow px-6 py-6">
          <MillerColumns searchTerm={searchTerm} />
        </div>
      </div>
    </main>
  );
}
