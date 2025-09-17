import React, { useState, useRef, useEffect } from 'react';
import { GraphViewState, ExtendedGraphNode, getAllUniversities, getEngineeringProgramsForUniversity } from '@/lib/graph-utils';

interface BreadcrumbsProps {
  viewState: GraphViewState;
  allNodes: Map<string, ExtendedGraphNode>;
  onNavigateHome: () => void;
  onSelectUniversity: (universityId: string) => void;
  onSelectMajor: (majorId: string, universityId?: string) => void;
  onSwitchUniversity: (newUniversityId: string, currentMajorId?: string) => void;
}

const BreadcrumbsEnhanced: React.FC<BreadcrumbsProps> = ({
  viewState,
  allNodes,
  onNavigateHome,
  onSelectUniversity,
  onSelectMajor,
  onSwitchUniversity
}) => {
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [showMajorDropdown, setShowMajorDropdown] = useState(false);
  
  const universityDropdownRef = useRef<HTMLDivElement>(null);
  const majorDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (universityDropdownRef.current && !universityDropdownRef.current.contains(event.target as Node)) {
        setShowUniversityDropdown(false);
      }
      if (majorDropdownRef.current && !majorDropdownRef.current.contains(event.target as Node)) {
        setShowMajorDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const universities = getAllUniversities(allNodes);
  const selectedUniversity = viewState.selectedUniversityId ? allNodes.get(viewState.selectedUniversityId) : null;
  const selectedProgram = viewState.selectedMajorId ? allNodes.get(viewState.selectedMajorId) : null;
  
  // Get available engineering programs based on selected university
  const availablePrograms = viewState.selectedUniversityId 
    ? getEngineeringProgramsForUniversity(viewState.selectedUniversityId, allNodes)
    : [];

  const handleUniversitySelect = (universityId: string) => {
    if (viewState.selectedUniversityId === universityId) {
      // Same university selected, just close dropdown
      setShowUniversityDropdown(false);
      return;
    }

    if (viewState.selectedMajorId) {
      // Check if current major/program is available in the new university
      const newUniversityPrograms = getEngineeringProgramsForUniversity(universityId, allNodes);
      const currentProgramAvailable = newUniversityPrograms.some((program: ExtendedGraphNode) => program.id === viewState.selectedMajorId);
      
      if (currentProgramAvailable) {
        // Switch university but keep the program
        onSwitchUniversity(universityId, viewState.selectedMajorId);
      } else {
        // Switch university and clear program since it's not available
        onSwitchUniversity(universityId);
      }
    } else {
      // No major selected, just select the university
      onSelectUniversity(universityId);
    }
    setShowUniversityDropdown(false);
  };

  const handleMajorSelect = (programId: string) => {
    onSelectMajor(programId, viewState.selectedUniversityId || undefined);
    setShowMajorDropdown(false);
  };

  return (
    <nav className="px-6 py-3 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center space-x-2 text-sm">
        
        {/* Home Breadcrumb */}
        <button
          onClick={onNavigateHome}
          className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors font-medium"
        >
          Home
        </button>

        <span className="text-gray-500">/</span>

        {/* University Dropdown */}
        <div className="relative" ref={universityDropdownRef}>
          <button
            onClick={() => setShowUniversityDropdown(!showUniversityDropdown)}
            className="text-teal-400 hover:text-teal-300 cursor-pointer transition-colors flex items-center gap-1 font-medium"
          >
            {selectedUniversity ? selectedUniversity.name : 'Select University'}
            <svg 
              className={`w-4 h-4 transition-transform ${showUniversityDropdown ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showUniversityDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50 min-w-64 max-h-64 overflow-y-auto">
              <div className="py-1">
                {universities.map((university) => (
                  <button
                    key={university.id}
                    onClick={() => handleUniversitySelect(university.id)}
                    className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors ${
                      university.id === viewState.selectedUniversityId 
                        ? 'text-teal-300 bg-gray-600 font-medium' 
                        : 'text-gray-200'
                    }`}
                  >
                    {university.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Show major dropdown only if a university is selected or there's a selected major */}
        {(viewState.selectedUniversityId || viewState.selectedMajorId) && (
          <>
            <span className="text-gray-500">/</span>
            
            {/* Major Dropdown */}
            <div className="relative" ref={majorDropdownRef}>
              <button
                onClick={() => setShowMajorDropdown(!showMajorDropdown)}
                className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors flex items-center gap-1 font-medium"
              >
                {selectedProgram ? selectedProgram.name : 'Select Program'}
                <svg 
                  className={`w-4 h-4 transition-transform ${showMajorDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showMajorDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50 min-w-56 max-h-64 overflow-y-auto">
                  <div className="py-1">
                    {availablePrograms.length > 0 ? (
                      availablePrograms.map((program: ExtendedGraphNode) => (
                        <button
                          key={program.id}
                          onClick={() => handleMajorSelect(program.id)}
                          className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors ${
                            program.id === viewState.selectedMajorId 
                              ? 'text-cyan-300 bg-gray-600 font-medium' 
                              : 'text-gray-200'
                          }`}
                        >
                          {program.name}
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-400 italic">
                        No programs available for this university
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default BreadcrumbsEnhanced;