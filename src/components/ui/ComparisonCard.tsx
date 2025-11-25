'use client';

import React from 'react';
import { PartnerUniversity, PartnerProgram, arcadiaMajors } from '@/data/engineering-paths';
import SpecialTag from './SpecialTag';
import { getTooltipContent, getShortText } from '@/lib/tooltip-utils';

interface ComparisonCardProps {
    university: PartnerUniversity;
    program: PartnerProgram;
    onRemove: () => void;
    isLowestGPA?: boolean;
    isHighestGPA?: boolean;
    hasFewestRequirements?: boolean;
    hasMostRequirements?: boolean;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
    university,
    program,
    onRemove,
    isLowestGPA,
    isHighestGPA,
    hasFewestRequirements,
    hasMostRequirements,
}) => {
    const matchingMajors = arcadiaMajors.filter(major =>
        program.arcadiaMajorIds.includes(major.id)
    );

    const gpaValue = university.requirements.gpa !== 'N/A' ? university.requirements.gpa : null;

    return (
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 flex flex-col h-full">
            {/* Header */}
            <div className="bg-cyan-600 px-4 py-3 relative">
                <button
                    onClick={onRemove}
                    className="absolute top-2 right-2 text-white hover:text-red-300 bg-white/20 hover:bg-red-500/30 rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 shadow-lg"
                    aria-label="Remove program"
                >
                    ✕
                </button>
                <h3 className="text-xl font-bold text-white pr-8 mb-1">{program.name}</h3>
                <p className="text-cyan-100 text-sm">{university.name}</p>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col space-y-4">
                {/* GPA Requirement */}
                <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-400 text-sm font-medium">GPA Requirement</span>
                        {isLowestGPA && (
                            <span className="text-xs bg-white text-gray-900 px-2 py-0.5 rounded-full font-semibold">
                                ✓ Lowest
                            </span>
                        )}
                        {isHighestGPA && (
                            <span className="text-xs bg-amber-600 text-white px-2 py-0.5 rounded-full font-semibold">
                                Highest
                            </span>
                        )}
                    </div>
                    <p className={`text-2xl font-bold ${isLowestGPA ? 'text-white' :
                        isHighestGPA ? 'text-amber-400' :
                            'text-cyan-400'
                        }`}>
                        {gpaValue || 'Not specified'}
                    </p>
                </div>

                {/* Matching Majors */}
                <div>
                    <span className="text-gray-400 text-sm font-medium block mb-2">Related Arcadia Majors</span>
                    <div className="flex flex-wrap gap-1">
                        {matchingMajors.map(major => (
                            <SpecialTag
                                key={major.id}
                                type="major"
                                text={major.name}
                                tooltip={getTooltipContent('major')}
                            />
                        ))}
                    </div>
                </div>

                {/* Program Structure */}
                {university.specialFeatures.programTypes.length > 0 && (
                    <div>
                        <span className="text-gray-400 text-sm font-medium block mb-2">Program Structure</span>
                        <SpecialTag
                            type="program-type"
                            text={university.specialFeatures.programTypes.join(' & ')}
                            tooltip={getTooltipContent('program-type', university, university.specialFeatures.programTypes.join(' & '))}
                        />
                    </div>
                )}

                {/* Special Features */}
                <div>
                    <span className="text-gray-400 text-sm font-medium block mb-2">Special Features</span>
                    <div className="flex flex-wrap gap-2">
                        {university.specialFeatures.guaranteedAdmission && (
                            <SpecialTag
                                type="guaranteed-admission"
                                text={getShortText('guaranteed-admission', 'Guaranteed')}
                                tooltip={getTooltipContent('guaranteed-admission', university)}
                            />
                        )}
                        {university.specialFeatures.coopRequired && (
                            <SpecialTag
                                type="coop"
                                text="Co-op"
                                tooltip={getTooltipContent('coop', university)}
                            />
                        )}
                        {university.specialFeatures.degreeInfo && (
                            <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded font-medium">
                                Dual Degree
                            </span>
                        )}
                    </div>
                </div>

                {/* Requirements Count */}
                <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-400 text-sm font-medium">Course Requirements</span>
                        {hasFewestRequirements && (
                            <span className="text-xs bg-white text-gray-900 px-2 py-0.5 rounded-full font-semibold">
                                ✓ Fewest
                            </span>
                        )}
                        {hasMostRequirements && (
                            <span className="text-xs bg-amber-600 text-white px-2 py-0.5 rounded-full font-semibold">
                                Most
                            </span>
                        )}
                    </div>
                    <p className={`text-2xl font-bold ${hasFewestRequirements ? 'text-white' :
                        hasMostRequirements ? 'text-amber-400' :
                            'text-purple-400'
                        }`}>
                        {program.requirements.length}
                    </p>
                </div>

                {/* Requirements List */}
                {program.requirements.length > 0 && (
                    <div className="flex-1">
                        <span className="text-gray-400 text-sm font-medium block mb-2">Requirements</span>
                        <div className="bg-gray-900 rounded-lg p-3 max-h-48 overflow-y-auto custom-scrollbar">
                            <ul className="space-y-1.5">
                                {program.requirements.map((req, idx) => (
                                    <li key={idx} className="text-gray-300 text-xs flex items-start">
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComparisonCard;
