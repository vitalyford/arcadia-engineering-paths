import { ArcadiaMajor, PartnerUniversity, PartnerProgram } from '@/data/engineering-paths';

// Simplified utilities for Miller Columns interface
// All graph and D3-related code has been removed

export interface SearchState {
  searchTerm: string;
}

// Helper function to filter universities by search term
export function filterUniversities(universities: PartnerUniversity[], searchTerm: string): PartnerUniversity[] {
  if (!searchTerm) return universities;
  
  return universities.filter(university =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    university.programs.some(program =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
}

// Helper function to filter programs by search term
export function filterPrograms(programs: PartnerProgram[], searchTerm: string): PartnerProgram[] {
  if (!searchTerm) return programs;
  
  return programs.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Helper function to get matching Arcadia majors for a program
export function getMatchingArcadiaMajors(program: PartnerProgram, majors: ArcadiaMajor[]): ArcadiaMajor[] {
  return majors.filter(major => program.arcadiaMajorIds.includes(major.id));
}