'use client';

import React from 'react';
import { arcadiaMajors } from '@/data/engineering-paths';

interface MajorSelectorProps {
  selectedMajorId: string | null;
  onMajorClick: (majorId: string) => void;
}

const MajorSelector: React.FC<MajorSelectorProps> = ({
  selectedMajorId,
  onMajorClick
}) => {
  const getMajorColor = (majorId: string) => {
    switch (majorId) {
      case 'computer-science':
        return 'bg-blue-600 hover:bg-blue-500';
      case 'mathematics':
        return 'bg-cyan-600 hover:bg-cyan-500';
      case 'chemistry':
        return 'bg-green-600 hover:bg-green-500';
      case 'data-science':
        return 'bg-purple-600 hover:bg-purple-500';
      default:
        return 'bg-gray-600 hover:bg-gray-500';
    }
  };

  const getMajorShortName = (majorId: string) => {
    switch (majorId) {
      case 'computer-science':
        return 'CS';
      case 'mathematics':
        return 'Math';
      case 'chemistry':
        return 'Chem';
      case 'data-science':
        return 'Data';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="p-3 bg-gray-800 rounded-lg mb-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-300">Arcadia Majors</h3>
        {selectedMajorId && (
          <span className="text-xs text-cyan-400 font-medium">
            {arcadiaMajors.find(m => m.id === selectedMajorId)?.name}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {arcadiaMajors.map((major) => (
          <button
            key={major.id}
            onClick={() => onMajorClick(major.id)}
            className={`
              flex-1 px-2 py-2 rounded text-center transition-all duration-200
              text-xs font-medium text-white
              ${getMajorColor(major.id)}
              ${selectedMajorId === major.id 
                ? 'ring-2 ring-yellow-400 ring-offset-1 ring-offset-gray-800' 
                : 'hover:ring-1 hover:ring-white/20'
              }
            `}
            title={major.name} // Tooltip for full name
          >
            <div className="truncate">
              {getMajorShortName(major.id)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MajorSelector;