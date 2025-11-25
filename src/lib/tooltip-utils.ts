import { PartnerUniversity } from '../data/engineering-paths';

export const MAJOR_TOOLTIP = 'These are the typical Arcadia majors for students pursuing this dual degree path.';

export const getTooltipContent = (
  type: 'guaranteed-admission' | 'program-type' | 'coop' | 'major',
  university?: PartnerUniversity,
  programText?: string
): string => {
  switch (type) {
    case 'major':
      return MAJOR_TOOLTIP;
    
    case 'guaranteed-admission':
      return 'If students satisfy the course and GPA requirements, they are automatically admitted. Other universities require application even after meeting requirements.';
    
    case 'program-type':
      if (!programText) return '';
      
      const tooltips: { [key: string]: string } = {
        '3+2': '3 years at Arcadia + 2 years at partner university\n(Reduced AUCs apply - only 10)',
        '4+2': '4 years at Arcadia + 2 years at partner university\n(All AUCs apply - 20+)',
        '4+3': '4 years at Arcadia + 3 years at partner university\n(All AUCs apply - 20+)', 
        '3+3': '3 years at Arcadia + 3 years at partner university\n(Reduced AUCs apply - only 10)',
        '2+1+1+1': '2 years at Arcadia + 1 year at partner\n+ 1 year at Arcadia + 1 final year at partner\n(All AUCs apply - 20+)'
      };
      
      // Handle multiple program types
      const programs = programText.split(' & ');
      const descriptions = programs.map(program => tooltips[program.trim()]).filter(Boolean);
      
      if (descriptions.length === 0) return programText;
      if (descriptions.length === 1) return descriptions[0];
      
      return descriptions.map(desc => `• ${desc}`).join('\n\n');
    
    case 'coop':
      if (university?.name === 'Drexel University') {
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