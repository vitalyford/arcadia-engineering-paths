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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:border-primary transition-all duration-300 flex flex-col h-full">
            {/* Header */}
            <div className="bg-primary px-4 py-3 relative">
                <button
                    onClick={onRemove}
                    className="absolute top-2 right-2 text-white hover:text-red-100 bg-white/20 hover:bg-white/30 rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 shadow-sm"
                    aria-label="Remove program"
                >
                    ✕
                </button>
                <h3 className="text-xl font-bold text-white pr-8 mb-1">{program.name}</h3>
                <p className="text-red-100 text-sm">{university.name}</p>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col space-y-4">
                {/* GPA Requirement */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-500 text-sm font-medium">GPA Requirement</span>
                        {isLowestGPA && (
                            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                                ✓ Lowest
                            </span>
                        )}
                        {isHighestGPA && (
                            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold border border-amber-200">
                                Highest
                            </span>
                        )}
                    </div>
                    <p className={`text-2xl font-bold ${isLowestGPA ? 'text-emerald-600' :
                        isHighestGPA ? 'text-amber-600' :
                            'text-primary'
                        }`}>
                        {gpaValue || 'Not specified'}
                    </p>
                </div>

                {/* Matching Majors */}
                <div>
                    <span className="text-gray-500 text-sm font-medium block mb-2">Related Arcadia Majors</span>
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
                        <span className="text-gray-500 text-sm font-medium block mb-2">Program Structure</span>
                        <SpecialTag
                            type="program-type"
                            text={university.specialFeatures.programTypes.join(' & ')}
                            tooltip={getTooltipContent('program-type', university, university.specialFeatures.programTypes.join(' & '))}
                        />
                    </div>
                )}

                {/* Special Features */}
                <div>
                    <span className="text-gray-500 text-sm font-medium block mb-2">Special Features</span>
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
                            <span className="text-xs bg-purple-100 text-purple-800 border border-purple-200 px-2 py-1 rounded font-medium">
                                Dual Degree
                            </span>
                        )}
                    </div>
                </div>

                {/* Requirements Count */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-500 text-sm font-medium">Course Requirements</span>
                        {hasFewestRequirements && (
                            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                                ✓ Fewest
                            </span>
                        )}
                        {hasMostRequirements && (
                            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold border border-amber-200">
                                Most
                            </span>
                        )}
                    </div>
                    <p className={`text-2xl font-bold ${hasFewestRequirements ? 'text-emerald-600' :
                        hasMostRequirements ? 'text-amber-600' :
                            'text-purple-600'
                        }`}>
                        {program.requirements.length}
                    </p>
                </div>

                {/* Requirements List */}
                {program.requirements.length > 0 && (
                    <div className="flex-1">
                        <span className="text-gray-500 text-sm font-medium block mb-2">Requirements</span>
                        <div className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto custom-scrollbar border border-gray-100">
                            <ul className="space-y-1.5">
                                {program.requirements.map((req, idx) => (
                                    <li key={idx} className="text-gray-700 text-xs flex items-start">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
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
