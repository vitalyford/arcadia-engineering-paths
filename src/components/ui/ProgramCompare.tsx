'use client';

import React, { useState, useMemo } from 'react';
import { PartnerUniversity, PartnerProgram } from '@/data/engineering-paths';
import ProgramSelector from './ProgramSelector';
import ComparisonCard from './ComparisonCard';

interface ProgramOption {
    university: PartnerUniversity;
    program: PartnerProgram;
}

const ProgramCompare: React.FC = () => {
    const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([]);

    const handleProgramSelect = (option: ProgramOption) => {
        if (selectedPrograms.length < 3) {
            setSelectedPrograms([...selectedPrograms, option]);
        }
    };

    const handleProgramRemove = (index: number) => {
        setSelectedPrograms(selectedPrograms.filter((_, i) => i !== index));
    };

    // Calculate comparison metrics
    const comparisonMetrics = useMemo(() => {
        if (selectedPrograms.length === 0) return null;

        const gpas = selectedPrograms
            .map((p, idx) => ({ value: p.university.requirements.gpa, index: idx }))
            .filter(g => g.value !== 'N/A')
            .map(g => ({ ...g, numValue: parseFloat(g.value) }));

        const requirementCounts = selectedPrograms.map((p, idx) => ({
            count: p.program.requirements.length,
            index: idx,
        }));

        let lowestGPAIndex: number | null = null;
        let highestGPAIndex: number | null = null;

        if (gpas.length > 0) {
            const sortedGPAs = [...gpas].sort((a, b) => a.numValue - b.numValue);
            lowestGPAIndex = sortedGPAs[0].index;
            highestGPAIndex = sortedGPAs[sortedGPAs.length - 1].index;

            // Don't highlight if all are the same
            if (sortedGPAs[0].numValue === sortedGPAs[sortedGPAs.length - 1].numValue) {
                lowestGPAIndex = null;
                highestGPAIndex = null;
            }
        }

        const sortedReqs = [...requirementCounts].sort((a, b) => a.count - b.count);
        const fewestReqsIndex = sortedReqs[0].index;
        const mostReqsIndex = sortedReqs[sortedReqs.length - 1].index;

        // Don't highlight if all are the same
        const allSameReqs = sortedReqs[0].count === sortedReqs[sortedReqs.length - 1].count;

        return {
            lowestGPAIndex,
            highestGPAIndex,
            fewestReqsIndex: allSameReqs ? null : fewestReqsIndex,
            mostReqsIndex: allSameReqs ? null : mostReqsIndex,
        };
    }, [selectedPrograms]);

    return (
        <div className="w-full h-full flex flex-col overflow-visible">
            {/* Header Section */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Compare Engineering Programs</h2>
                        <p className="text-gray-400">
                            Select up to 3 programs to compare side-by-side
                        </p>
                    </div>
                    {selectedPrograms.length > 0 && (
                        <button
                            onClick={() => setSelectedPrograms([])}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg"
                        >
                            Clear All ({selectedPrograms.length})
                        </button>
                    )}
                </div>

                {/* Program Selector */}
                <ProgramSelector
                    selectedPrograms={selectedPrograms}
                    onProgramSelect={handleProgramSelect}
                    maxSelections={3}
                />

                {/* Selection Info */}
                <div className="mt-3 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-300">Best value</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                        <span className="text-gray-300">Highest requirement</span>
                    </div>
                    <div className="flex-1 text-right text-gray-400">
                        {selectedPrograms.length} / 3 programs selected
                    </div>
                </div>
            </div>

            {/* Comparison Grid - changed to overflow-visible for tooltips */}
            <div className="flex-1 overflow-visible">
                {selectedPrograms.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-4 opacity-50">🔍</div>
                            <h3 className="text-2xl font-bold text-white mb-2">No Programs Selected</h3>
                            <p className="text-gray-400 max-w-md">
                                Use the search bar above to add programs to compare.
                                <br />
                                You can compare up to 3 programs at once.
                            </p>
                            <div className="mt-6 grid grid-cols-1 gap-3 max-w-sm mx-auto text-sm text-gray-300">
                                <div className="bg-gray-800 rounded-lg p-3 text-left">
                                    <span className="font-semibold text-cyan-400">💡 Tip:</span> Compare programs from different universities to find the best fit
                                </div>
                                <div className="bg-gray-800 rounded-lg p-3 text-left">
                                    <span className="font-semibold text-cyan-400">💡 Tip:</span> Look for blue badges to identify the easiest programs
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`grid gap-6 ${selectedPrograms.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' :
                            selectedPrograms.length === 2 ? 'grid-cols-1 lg:grid-cols-2' :
                                'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
                        }`}>
                        {selectedPrograms.map((option, index) => (
                            <div
                                key={`${option.university.id}-${option.program.id}`}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <ComparisonCard
                                    university={option.university}
                                    program={option.program}
                                    onRemove={() => handleProgramRemove(index)}
                                    isLowestGPA={comparisonMetrics?.lowestGPAIndex === index}
                                    isHighestGPA={comparisonMetrics?.highestGPAIndex === index}
                                    hasFewestRequirements={comparisonMetrics?.fewestReqsIndex === index}
                                    hasMostRequirements={comparisonMetrics?.mostReqsIndex === index}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProgramCompare;
