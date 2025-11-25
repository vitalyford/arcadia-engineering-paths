'use client';

import React, { useState, useMemo } from 'react';
import { partnerUniversities, PartnerUniversity, PartnerProgram } from '@/data/engineering-paths';

interface ProgramOption {
    university: PartnerUniversity;
    program: PartnerProgram;
}

interface ProgramSelectorProps {
    selectedPrograms: ProgramOption[];
    onProgramSelect: (option: ProgramOption) => void;
    maxSelections?: number;
}

const ProgramSelector: React.FC<ProgramSelectorProps> = ({
    selectedPrograms,
    onProgramSelect,
    maxSelections = 3,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const isMaxSelected = selectedPrograms.length >= maxSelections;

    // Filter and search programs
    const filteredOptions = useMemo(() => {
        const options: ProgramOption[] = [];

        partnerUniversities.forEach(university => {
            university.programs.forEach(program => {
                options.push({ university, program });
            });
        });

        if (!searchTerm) return options;

        return options.filter(option => {
            const matchesProgram = option.program.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesUniversity = option.university.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesProgram || matchesUniversity;
        });
    }, [searchTerm]);

    // Group by university
    const groupedOptions = useMemo(() => {
        const groups: Record<string, ProgramOption[]> = {};

        filteredOptions.forEach(option => {
            const universityName = option.university.name;
            if (!groups[universityName]) {
                groups[universityName] = [];
            }
            groups[universityName].push(option);
        });

        return groups;
    }, [filteredOptions]);

    const handleSelect = (option: ProgramOption) => {
        // Check if already selected
        const alreadySelected = selectedPrograms.some(
            selected =>
                selected.program.id === option.program.id &&
                selected.university.id === option.university.id
        );

        if (!alreadySelected && !isMaxSelected) {
            onProgramSelect(option);
            setSearchTerm('');
            setIsOpen(false);
        }
    };

    const isSelected = (option: ProgramOption) => {
        return selectedPrograms.some(
            selected =>
                selected.program.id === option.program.id &&
                selected.university.id === option.university.id
        );
    };

    return (
        <div className="relative w-full">
            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder={isMaxSelected ? `Maximum ${maxSelections} programs selected` : "Search and add programs to compare..."}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    disabled={isMaxSelected}
                    className={`w-full bg-gray-700 text-white placeholder-gray-400 px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${isMaxSelected ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {isOpen && !isMaxSelected ? '▲' : '▼'}
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && !isMaxSelected && (
                <>
                    {/* Backdrop to close dropdown */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown content */}
                    <div className="absolute top-full mt-2 w-full bg-gray-700 rounded-lg shadow-2xl z-20 max-h-96 overflow-y-auto border border-gray-600">
                        {Object.keys(groupedOptions).length === 0 ? (
                            <div className="p-4 text-center text-gray-400">
                                No programs found
                            </div>
                        ) : (
                            <div className="py-2">
                                {Object.entries(groupedOptions).map(([universityName, options]) => (
                                    <div key={universityName}>
                                        {/* University Header */}
                                        <div className="px-4 py-2 bg-gray-600 text-cyan-300 font-semibold text-sm sticky top-0">
                                            {universityName}
                                        </div>

                                        {/* Programs */}
                                        {options.map(option => {
                                            const selected = isSelected(option);
                                            return (
                                                <div
                                                    key={`${option.university.id}-${option.program.id}`}
                                                    onClick={() => handleSelect(option)}
                                                    className={`px-4 py-3 cursor-pointer hover:bg-gray-600 transition-colors border-b border-gray-600 ${selected ? 'bg-gray-600/50 opacity-50' : ''
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <p className="text-white font-medium">{option.program.name}</p>
                                                            <p className="text-gray-400 text-xs mt-0.5">
                                                                {option.program.requirements.length} requirement{option.program.requirements.length !== 1 ? 's' : ''}
                                                                {option.university.requirements.gpa !== 'N/A' && (
                                                                    <span className="ml-2 text-yellow-400">
                                                                        • GPA: {option.university.requirements.gpa}
                                                                    </span>
                                                                )}
                                                            </p>
                                                        </div>
                                                        {selected && (
                                                            <span className="text-green-400 ml-2">✓</span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProgramSelector;
