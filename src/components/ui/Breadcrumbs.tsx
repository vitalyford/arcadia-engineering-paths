
import React, { useState } from 'react';
import { ArcadiaMajor, PartnerUniversity, PartnerProgram, partnerUniversities, arcadiaMajors } from '@/data/engineering-paths';

interface BreadcrumbsProps {
  selectedNode: (ArcadiaMajor | PartnerUniversity | PartnerProgram) & { x?: number; y?: number, type?: string, universityId?: string } | null;
  onNodeSelect?: (node: (ArcadiaMajor | PartnerUniversity | PartnerProgram) & { x?: number; y?: number, type?: string } | null) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ selectedNode, onNodeSelect }) => {
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [showMajorDropdown, setShowMajorDropdown] = useState(false);

  const getPath = () => {
    if (!selectedNode) {
      return [
        <span key="home" className="text-gray-300">Home</span>
      ];
    }

    const path = [
      <button 
        key="home" 
        className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
        onClick={() => onNodeSelect?.(null)}
      >
        Home
      </button>
    ];

    switch (selectedNode.type) {
      case 'major':
        path.push(
          <span key="separator1" className="text-gray-500 mx-2">/</span>,
          <div key="major-dropdown" className="relative inline-block">
            <button
              className="text-cyan-400 hover:text-cyan-300 cursor-pointer flex items-center"
              onClick={() => setShowMajorDropdown(!showMajorDropdown)}
            >
              {selectedNode.name}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showMajorDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-gray-700 rounded-lg shadow-lg z-10 min-w-48">
                {arcadiaMajors.map(major => (
                  <button
                    key={major.id}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => {
                      onNodeSelect?.({ ...major, type: 'major', x: 0, y: 0 });
                      setShowMajorDropdown(false);
                    }}
                  >
                    {major.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
        break;
      case 'university':
        path.push(
          <span key="separator1" className="text-gray-500 mx-2">/</span>,
          <div key="university-dropdown" className="relative inline-block">
            <button
              className="text-teal-400 hover:text-teal-300 cursor-pointer flex items-center"
              onClick={() => setShowUniversityDropdown(!showUniversityDropdown)}
            >
              {selectedNode.name}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showUniversityDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-gray-700 rounded-lg shadow-lg z-10 min-w-64">
                {partnerUniversities.map(university => (
                  <button
                    key={university.id}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => {
                      onNodeSelect?.({ ...university, type: 'university', x: 0, y: 0 });
                      setShowUniversityDropdown(false);
                    }}
                  >
                    {university.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
        break;
      case 'program':
        const university = partnerUniversities.find(uni => uni.id === selectedNode.universityId);
        if (university) {
          path.push(
            <span key="separator1" className="text-gray-500 mx-2">/</span>,
            <button 
              key={university.id} 
              className="text-teal-400 hover:text-teal-300 cursor-pointer"
              onClick={() => onNodeSelect?.({ ...university, type: 'university', x: 0, y: 0 })}
            >
              {university.name}
            </button>
          );
        }
        path.push(
          <span key="separator2" className="text-gray-500 mx-2">/</span>,
          <span key={selectedNode.id} className="text-indigo-400">{selectedNode.name}</span>
        );
        break;
    }

    return path;
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowUniversityDropdown(false);
      setShowMajorDropdown(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="p-4 bg-gray-900">
      <div className="flex items-center flex-wrap">
        {getPath().map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;
