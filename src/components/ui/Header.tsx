

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
        <div className="relative flex justify-center items-center mb-4">
          <div className="text-center">
            <h1 className="text-4xl font-light text-gray-900 tracking-tight">Arcadia University Engineering Pathways</h1>
            <p className="text-gray-600 mt-1">Your guide to dual-degree engineering programs</p>
          </div>
          {activeView === 'pathways' && (
            <div className="absolute right-0 flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search majors, universities..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-gray-100 text-gray-900 placeholder-gray-500 px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
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

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 border border-gray-200">
          <button
            onClick={() => onViewChange('pathways')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'pathways'
              ? 'bg-primary text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
          >
            Engineering Pathways
          </button>
          <button
            onClick={() => onViewChange('requirements')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'requirements'
              ? 'bg-primary text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
          >
            Arcadia Course Requirements
          </button>
          <button
            onClick={() => onViewChange('compare')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'compare'
              ? 'bg-primary text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
          >
            Compare Programs
          </button>
        </div>
      </div>
    </header>
  );
};


export default Header;
