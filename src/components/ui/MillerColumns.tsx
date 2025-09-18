'use client';

import React, { useState, useMemo } from 'react';
import { partnerUniversities, arcadiaMajors, PartnerUniversity, PartnerProgram } from '@/data/engineering-paths';

interface MillerColumnsProps {
  searchTerm: string;
}

interface SelectedState {
  university: PartnerUniversity | null;
  program: PartnerProgram | null;
}

const MillerColumns: React.FC<MillerColumnsProps> = ({ searchTerm }) => {
  const [selected, setSelected] = useState<SelectedState>({
    university: null,
    program: null,
  });

  // Filter universities based on search term
  const filteredUniversities = useMemo(() => {
    if (!searchTerm) return partnerUniversities;
    return partnerUniversities.filter(university =>
      university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.programs.some(program =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Filter programs based on selected university and search term
  const filteredPrograms = useMemo(() => {
    if (!selected.university) return [];
    if (!searchTerm) return selected.university.programs;
    return selected.university.programs.filter(program => {
      // Check program name
      const matchesProgramName = program.name.toLowerCase().includes(searchTerm.toLowerCase());
      // Check related majors
      const matchesRelatedMajor = program.arcadiaMajorIds.some(majorId => {
        const major = arcadiaMajors.find(m => m.id === majorId);
        return major && major.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      return matchesProgramName || matchesRelatedMajor;
    });
  }, [selected.university, searchTerm]);

  // Get Arcadia majors that match the selected program
  const matchingArcadiaMajors = useMemo(() => {
    if (!selected.program) return [];
    return arcadiaMajors.filter(major =>
      selected.program!.arcadiaMajorIds.includes(major.id)
    );
  }, [selected.program]);

  const handleUniversitySelect = (university: PartnerUniversity) => {
    setSelected({
      university,
      program: null, // Reset program selection when university changes
    });
  };

  const handleProgramSelect = (program: PartnerProgram) => {
    setSelected(prev => ({
      ...prev,
      program,
    }));
  };

  return (
    <div className="w-full h-full flex bg-gray-800 rounded-lg overflow-hidden shadow-xl" style={{ height: 'calc(100vh - 200px)' }}>
      {/* Column 1: Universities */}
      <div className="w-1/3 border-r border-gray-700 flex flex-col h-full">
        <div className="bg-gray-700 px-4 py-3 border-b border-gray-600 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-semibold text-white flex items-center">
            Universities ({filteredUniversities.length})
          </h2>
          {searchTerm && (
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
              Filtered
            </span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto min-h-0" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {filteredUniversities.map((university) => (
            <div
              key={university.id}
              onClick={() => handleUniversitySelect(university)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-700 hover:bg-gray-600 transition-colors ${
                selected.university?.id === university.id ? 'bg-blue-600 hover:bg-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">{university.name}</h3>
                  <p className="text-sm text-gray-400">
                    {university.programs.length} program{university.programs.length !== 1 ? 's' : ''}
                    {university.requirements.gpa !== 'N/A' && (
                      <span className="ml-2 text-yellow-400">
                        • GPA: {university.requirements.gpa}
                      </span>
                    )}
                  </p>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 2: Programs */}
      <div className="w-1/3 border-r border-gray-700 flex flex-col h-full">
        <div className="bg-gray-700 px-4 py-3 border-b border-gray-600 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-semibold text-white flex items-center">
            Programs {selected.university ? `(${filteredPrograms.length})` : ''}
          </h2>
          {selected.university && searchTerm && (
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
              Filtered
            </span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto min-h-0" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {!selected.university ? (
            <div className="p-4 text-center text-gray-400">
              <div className="text-4xl mb-2 opacity-50">🎓</div>
              <p>Select a university to view programs</p>
            </div>
          ) : (
            filteredPrograms.map((program) => (
              <div
                key={program.id}
                onClick={() => handleProgramSelect(program)}
                className={`px-4 py-3 cursor-pointer border-b border-gray-700 hover:bg-gray-600 transition-colors ${
                  selected.program?.id === program.id ? 'bg-blue-600 hover:bg-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">{program.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {program.arcadiaMajorIds.map((majorId) => {
                        const major = arcadiaMajors.find(m => m.id === majorId);
                        return major ? (
                          <span
                            key={majorId}
                            className="text-xs bg-cyan-600 text-white px-2 py-1 rounded"
                          >
                            {major.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Column 3: Details */}
      <div className="flex-1 flex flex-col bg-gray-750 h-full">
        <div className="bg-gray-700 px-4 py-3 border-b border-gray-600 flex-shrink-0">
          <h2 className="text-lg font-semibold text-white flex items-center">
            Details
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 min-h-0" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {!selected.program ? (
            <div className="text-center text-gray-400 mt-8">
              <div className="text-4xl mb-2 opacity-50">📋</div>
              <p>Select a program to view requirements</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Program Header */}
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                  {selected.program.name}
                </h3>
                <p className="text-gray-300">
                  at {selected.university?.name}
                </p>
              </div>

              {/* University Requirements */}
              {selected.university?.requirements && (
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">University Requirements</h4>
                  {selected.university.requirements.gpa !== 'N/A' && (
                    <div className="mb-2">
                      <span className="text-yellow-400 font-medium">GPA Required: </span>
                      <span className="text-white">{selected.university.requirements.gpa}</span>
                    </div>
                  )}
                  <p className="text-gray-300 text-sm">{selected.university.requirements.notes}</p>
                </div>
              )}

              {/* Matching Arcadia Majors moved to header as tags above */}

              {/* Program Requirements */}
              {selected.program.requirements.length > 0 && (
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Program Requirements</h4>
                  <ul className="space-y-2">
                    {selected.program.requirements.map((requirement, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Total Programs:</span>
                    <p className="text-white font-medium">{selected.university?.programs.length}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Required GPA:</span>
                    <p className="text-white font-medium">
                      {selected.university?.requirements.gpa || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Matching Majors:</span>
                    <p className="text-white font-medium">{matchingArcadiaMajors.length}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Requirements:</span>
                    <p className="text-white font-medium">{selected.program.requirements.length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MillerColumns;