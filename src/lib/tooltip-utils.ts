import { PartnerUniversity } from '../data/engineering-paths';

export const getTooltipContent = (
  type: 'guaranteed-admission' | 'program-type' | 'coop',
  university: PartnerUniversity,
  programText?: string
): string => {
  switch (type) {
    case 'guaranteed-admission':
      return 'If students satisfy the course and GPA requirements, they are automatically admitted. Other universities require application even after meeting requirements.';
    
    case 'program-type':
      if (!programText) return '';
      
      const tooltips: { [key: string]: string } = {
        '3+2': '3 years at Arcadia + 2 years at partner university',
        '4+3': '4 years at Arcadia + 3 years at partner university', 
        '3+3': '3 years at Arcadia + 3 years at partner university',
        '2+1+1+1': '2 years at Arcadia, 1 at partner university, 1 at Arcadia, 1 final at partner university'
      };
      
      // Handle multiple program types
      const programs = programText.split(' & ');
      const descriptions = programs.map(program => tooltips[program.trim()]).filter(Boolean);
      
      if (descriptions.length === 0) return programText;
      if (descriptions.length === 1) return descriptions[0];
      
      return descriptions.join(' • ');
    
    case 'coop':
      if (university.name === 'Drexel University') {
        return 'Includes 1 co-op (practicum) year out of the 3 years at Drexel. Co-op provides hands-on work experience at companies.';
      }
      return 'Co-op (cooperative education) provides hands-on work experience at companies during studies.';
    
    default:
      return '';
  }
};

export const getShortText = (type: 'guaranteed-admission' | 'program-type' | 'coop', originalText: string): string => {
  switch (type) {
    case 'guaranteed-admission':
      return 'Auto Admit';
    default:
      return originalText;
  }
};