'use client';

import React, { useState, useMemo } from 'react';
import { partnerUniversities, arcadiaMajors, PartnerUniversity, PartnerProgram } from '@/data/engineering-paths';
import SpecialTag from './SpecialTag';
import { getTooltipContent, getShortText } from '@/lib/tooltip-utils';

interface MillerColumnsProps {
  searchTerm: string;
}

interface SelectedState {
  university: PartnerUniversity | null;
  program: PartnerProgram | null;
}

// Mobile column view type
type MobileColumn = 'universities' | 'programs' | 'details';

// Reusable back button icon
const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

// Mobile back button component
const MobileBackButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className="md:hidden mr-2 p-1 text-gray-500 hover:text-gray-700"
    aria-label={label}
  >
    <BackIcon />
  </button>
);

// Breadcrumb button component
const BreadcrumbButton = ({ 
  isActive, 
  isEnabled, 
  onClick, 
  children 
}: { 
  isActive: boolean; 
  isEnabled: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    disabled={!isEnabled}
    className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
      isActive
        ? 'bg-primary text-white'
        : isEnabled
        ? 'bg-white text-gray-600 hover:bg-gray-50'
        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
    }`}
  >
    {children}
  </button>
);

// Helper to get column visibility classes
const getColumnClasses = (mobileColumn: MobileColumn, targetColumn: MobileColumn, extraClasses: string = '') => 
  `${mobileColumn === targetColumn ? 'flex' : 'hidden'} md:flex ${extraClasses}`.trim();

const MillerColumns: React.FC<MillerColumnsProps> = ({ searchTerm }) => {
  const [selected, setSelected] = useState<SelectedState>({
    university: null,
    program: null,
  });
  
  // Track which column is visible on mobile
  const [mobileColumn, setMobileColumn] = useState<MobileColumn>('universities');

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
    // Auto-navigate to programs column on mobile
    setMobileColumn('programs');
  };

  const handleProgramSelect = (program: PartnerProgram) => {
    setSelected(prev => ({
      ...prev,
      program,
    }));
    // Auto-navigate to details column on mobile
    setMobileColumn('details');
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200">
      {/* Mobile Navigation Breadcrumb */}
      <div className="md:hidden bg-gray-100 border-b border-gray-200 px-2 py-2 flex items-center gap-1 text-sm overflow-x-auto">
        <BreadcrumbButton isActive={mobileColumn === 'universities'} isEnabled={true} onClick={() => setMobileColumn('universities')}>
          Universities
        </BreadcrumbButton>
        <span className="text-gray-400">›</span>
        <BreadcrumbButton isActive={mobileColumn === 'programs'} isEnabled={!!selected.university} onClick={() => setMobileColumn('programs')}>
          {selected.university ? selected.university.name.split(' ').slice(0, 2).join(' ') : 'Programs'}
        </BreadcrumbButton>
        <span className="text-gray-400">›</span>
        <BreadcrumbButton isActive={mobileColumn === 'details'} isEnabled={!!selected.program} onClick={() => setMobileColumn('details')}>
          Details
        </BreadcrumbButton>
      </div>
      
      {/* Columns Container */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Column 1: Universities */}
        <div className={getColumnClasses(mobileColumn, 'universities', 'w-full md:w-1/3 border-r border-gray-200 flex-col h-full')}>
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              Universities ({filteredUniversities.length})
            </h2>
            {searchTerm && (
              <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                Filtered
              </span>
            )}
          </div>
          <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {filteredUniversities.map((university) => (
            <div
              key={university.id}
              onClick={() => handleUniversitySelect(university)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${selected.university?.id === university.id ? 'bg-red-50 hover:bg-red-100 border-l-4 border-l-primary' : ''
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className={`font-medium mb-1 ${selected.university?.id === university.id ? 'text-primary' : 'text-gray-900'}`}>{university.name}</h3>

                  {/* Special Features Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {university.specialFeatures.guaranteedAdmission && (
                      <SpecialTag
                        type="guaranteed-admission"
                        text={getShortText('guaranteed-admission', 'Guaranteed Admission')}
                        tooltip={getTooltipContent('guaranteed-admission', university)}
                      />
                    )}

                    {university.specialFeatures.programTypes.length > 0 && (
                      <SpecialTag
                        type="program-type"
                        text={university.specialFeatures.programTypes.join(' & ')}
                        tooltip={getTooltipContent('program-type', university, university.specialFeatures.programTypes.join(' & '))}
                      />
                    )}

                    {university.specialFeatures.coopRequired && (
                      <SpecialTag
                        type="coop"
                        text="Co-op"
                        tooltip={getTooltipContent('coop', university)}
                      />
                    )}
                  </div>

                  {/* Degree Info */}
                  {university.specialFeatures.degreeInfo && (
                    <p className="text-xs text-gray-600 mb-1">
                      {university.specialFeatures.degreeInfo}
                    </p>
                  )}

                  {/* Unique Structure Info */}
                  {university.specialFeatures.uniqueStructure && (
                    <p className="text-xs text-green-600 mb-1">
                      {university.specialFeatures.uniqueStructure}
                    </p>
                  )}

                  {/* Drexel-specific Intent to Enroll reminder */}
                  {university.id === 'drexel-university' && (
                    <p className="text-xs text-primary mb-1 font-medium">
                      📋 Requires an &quot;Intent to Enroll form&quot; during 2nd year
                    </p>
                  )}

                  {/* Program count and GPA */}
                  <p className="text-sm text-gray-500">
                    {university.programs.length} program{university.programs.length !== 1 ? 's' : ''}
                    {university.requirements.gpa !== 'N/A' && (
                      <span className="ml-2 text-amber-600 font-medium">
                        • GPA: {university.requirements.gpa}
                      </span>
                    )}
                  </p>
                </div>
                <span className="text-gray-400 ml-2 flex-shrink-0">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 2: Programs */}
      <div className={getColumnClasses(mobileColumn, 'programs', 'w-full md:w-1/3 border-r border-gray-200 flex-col h-full')}>
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <MobileBackButton onClick={() => setMobileColumn('universities')} label="Back to universities" />
          <h2 className="text-lg font-semibold text-gray-900 flex items-center flex-1">
            Programs {selected.university ? `(${filteredPrograms.length})` : ''}
          </h2>
          {selected.university && searchTerm && (
            <span className="text-xs bg-primary text-white px-2 py-1 rounded">
              Filtered
            </span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {!selected.university ? (
            <div className="h-full flex items-center justify-center text-center text-gray-400">
              <div>
                <div className="text-4xl mb-2 opacity-50">🎓</div>
                <p>Select a university to view programs</p>
              </div>
            </div>
          ) : (
            filteredPrograms.map((program) => (
              <div
                key={program.id}
                onClick={() => handleProgramSelect(program)}
                className={`px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${selected.program?.id === program.id ? 'bg-red-50 hover:bg-red-100 border-l-4 border-l-primary' : ''
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium ${selected.program?.id === program.id ? 'text-primary' : 'text-gray-900'}`}>{program.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {program.arcadiaMajorIds.map((majorId) => {
                        const major = arcadiaMajors.find(m => m.id === majorId);
                        return major ? (
                          <SpecialTag
                            key={majorId}
                            type="major"
                            text={major.name}
                            tooltip={getTooltipContent('major')}
                          />
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
      <div className={getColumnClasses(mobileColumn, 'details', 'flex-1 flex-col bg-white h-full')}>
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex-shrink-0 flex items-center">
          <MobileBackButton onClick={() => setMobileColumn('programs')} label="Back to programs" />
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            Details
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 min-h-0 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {!selected.program ? (
            <div className="h-full flex items-center justify-center text-center text-gray-400">
              <div>
                <div className="text-4xl mb-2 opacity-50">📋</div>
                <p>Select a program to view requirements</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Program Header */}
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {selected.program.name}
                </h3>
                <p className="text-gray-600">
                  at {selected.university?.name}
                </p>
              </div>

              {/* Important Requirement - Intent to Enroll (Drexel Only) */}
              {selected.university?.id === 'drexel-university' && (
                <div className="bg-red-50 border-l-4 border-primary rounded-lg p-4 shadow-sm mb-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">📋</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-primary mb-2">Important: Intent to Enroll Form Required</h4>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        Students must submit an <span className="text-primary font-semibold">Intent to Enroll form</span> during their <span className="text-primary font-semibold">second year</span> to inform the Drexel College of Engineering of their intent to transfer and indicate their engineering program of interest.
                      </p>
                      {selected.university.downloadableForm && (
                        <a
                          href={selected.university.downloadableForm.path}
                          download
                          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download {selected.university.downloadableForm.name}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* University Requirements */}
              {selected.university?.requirements && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">University Requirements</h4>
                  {selected.university.requirements.gpa !== 'N/A' && (
                    <div className="mb-2">
                      <span className="text-amber-600 font-medium">GPA Required: </span>
                      <span className="text-gray-900">{selected.university.requirements.gpa}</span>
                    </div>
                  )}
                  {selected.university.id !== 'drexel-university' && (
                    <div className="text-gray-600 text-sm whitespace-pre-line">
                      {selected.university.requirements.notes.split('\n').map((line, idx, array) => {
                        const urlRegex = /(https?:\/\/[^\s]+)/g;
                        const parts = line.split(urlRegex);
                        return (
                          <span key={idx}>
                            {parts.map((part, i) => {
                              if (part.match(urlRegex)) {
                                return (
                                  <a
                                    key={i}
                                    href={part}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary-hover underline"
                                  >
                                    {part}
                                  </a>
                                );
                              }
                              return <span key={i}>{part}</span>;
                            })}
                            {idx < array.length - 1 && <br />}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  {selected.university.id === 'drexel-university' && (
                    <p className="text-gray-600 text-sm">No specific GPA mentioned, but a strong academic record is expected.</p>
                  )}
                </div>
              )}

              {/* Matching Arcadia Majors moved to header as tags above */}

              {/* Program Requirements */}
              {selected.program.requirements.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Program Requirements</h4>
                  <ul className="space-y-2">
                    {selected.program.requirements.map((requirement, index) => (
                      <li key={index} className="text-gray-700 text-sm flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Special Program Features */}
              {selected.university?.specialFeatures && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Program Features</h4>

                  {/* Guaranteed Admission */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-600 font-medium">Admission Type:</span>
                      {selected.university.specialFeatures.guaranteedAdmission ? (
                        <SpecialTag
                          type="guaranteed-admission"
                          text={getShortText('guaranteed-admission', 'Guaranteed Admission')}
                          tooltip={getTooltipContent('guaranteed-admission', selected.university)}
                        />
                      ) : (
                        <span className="text-orange-600 font-medium">Application Required</span>
                      )}
                    </div>
                  </div>

                  {/* Program Types */}
                  {selected.university.specialFeatures.programTypes.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-600 font-medium">Program Structure:</span>
                        <SpecialTag
                          type="program-type"
                          text={selected.university.specialFeatures.programTypes.join(' & ')}
                          tooltip={getTooltipContent('program-type', selected.university, selected.university.specialFeatures.programTypes.join(' & '))}
                        />
                      </div>
                    </div>
                  )}

                  {/* Degree Information */}
                  {selected.university.specialFeatures.degreeInfo && (
                    <div className="mb-4">
                      <span className="text-gray-600 font-medium">Degrees Earned: </span>
                      <span className="text-gray-900">{selected.university.specialFeatures.degreeInfo}</span>
                    </div>
                  )}

                  {/* Co-op Information */}
                  {selected.university.specialFeatures.coopRequired && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-600 font-medium">Co-op Requirement:</span>
                        <SpecialTag
                          type="coop"
                          text="Required"
                          tooltip={getTooltipContent('coop', selected.university)}
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        Students complete 1 year of co-op (practicum) experience at a company during their time at the partner university.
                      </p>
                    </div>
                  )}

                  {/* Unique Structure Information */}
                  {selected.university.specialFeatures.uniqueStructure && (
                    <div className="mb-4">
                      <span className="text-gray-600 font-medium">Special Feature: </span>
                      <span className="text-green-600">{selected.university.specialFeatures.uniqueStructure}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total Programs:</span>
                    <p className="text-gray-900 font-medium">{selected.university?.programs.length}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Required GPA:</span>
                    <p className="text-gray-900 font-medium">
                      {selected.university?.requirements.gpa || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Matching Majors:</span>
                    <p className="text-gray-900 font-medium">{matchingArcadiaMajors.length}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Requirements:</span>
                    <p className="text-gray-900 font-medium">{selected.program.requirements.length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default MillerColumns;