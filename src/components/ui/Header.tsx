
import React from 'react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeView: 'pathways' | 'requirements';
  onViewChange: (view: 'pathways' | 'requirements') => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, activeView, onViewChange }) => {
  return (
    <header className="w-full bg-gray-800 shadow-lg">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white">Arcadia Engineering Pathways</h1>
            <p className="text-gray-400 mt-1">Your guide to dual-degree engineering programs.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search majors, universities, or programs..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => onViewChange('pathways')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeView === 'pathways'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-gray-600'
            }`}
          >
            Engineering Pathways
          </button>
          <button
            onClick={() => onViewChange('requirements')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeView === 'requirements'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-gray-600'
            }`}
          >
            Arcadia Course Requirements
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
