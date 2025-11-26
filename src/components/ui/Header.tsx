

import React from 'react';
import BlueprintBackground from './FloatingFormulas';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeView: 'pathways' | 'requirements' | 'compare';
  onViewChange: (view: 'pathways' | 'requirements' | 'compare') => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, activeView, onViewChange }) => {
  return (
    <header className="w-full bg-white shadow-lg border-b border-gray-200 relative">
      <BlueprintBackground />
      <div className="container mx-auto p-4">
        {/* Title - always on top */}
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-4xl font-light text-gray-900 tracking-tight">Arcadia University Engineering Pathways</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Your guide to dual-degree engineering programs</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 border border-gray-200 mb-3">
          <button
            onClick={() => onViewChange('pathways')}
            className={`flex-1 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-colors ${activeView === 'pathways'
              ? 'bg-primary text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
          >
            <span className="hidden md:inline">Engineering Pathways</span>
            <span className="md:hidden">Pathways</span>
          </button>
          <button
            onClick={() => onViewChange('requirements')}
            className={`flex-1 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-colors ${activeView === 'requirements'
              ? 'bg-primary text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
          >
            <span className="hidden md:inline">Arcadia Course Requirements</span>
            <span className="md:hidden">Requirements</span>
          </button>
          <button
            onClick={() => onViewChange('compare')}
            className={`flex-1 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-colors ${activeView === 'compare'
              ? 'bg-primary text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
          >
            <span className="hidden md:inline">Compare Programs</span>
            <span className="md:hidden">Compare</span>
          </button>
        </div>

        {/* Search Bar - below tabs on mobile, positioned absolutely on desktop */}
        {activeView === 'pathways' && (
          <div className="md:absolute md:top-4 md:right-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search majors, universities..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-gray-100 text-gray-900 placeholder-gray-500 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};


export default Header;
