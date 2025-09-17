
import React from 'react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="w-full bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
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
    </header>
  );
};

export default Header;
