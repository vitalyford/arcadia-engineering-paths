/**
 * Determines the next semester period and year based on the current date
 * Rules:
 * - March 7 to October 15: Fall of current year
 * - October 16 to December 31: Spring of next year
 * - January 1 to March 6: Spring of current year
 * 
 * @returns Object with period (e.g., "FALL") and year (e.g., "2025")
 */
export function getNextSemester(): { period: string; year: string } {
  const now = new Date();
  const currentYear = now.getFullYear();
  const month = now.getMonth() + 1; // JavaScript months are 0-indexed
  const day = now.getDate();

  // Convert date to comparable number (MMDD format)
  const currentDate = month * 100 + day;

  // March 7 (0307) to October 15 (1015): Fall of current year
  if (currentDate >= 307 && currentDate <= 1015) {
    return {
      period: 'FALL',
      year: currentYear.toString()
    };
  }
  
  // October 16 (1016) to December 31 (1231): Spring of next year
  if (currentDate >= 1016 && currentDate <= 1231) {
    return {
      period: 'SPRING',
      year: (currentYear + 1).toString()
    };
  }
  
  // January 1 (0101) to March 6 (0306): Spring of current year
  if (currentDate >= 101 && currentDate <= 306) {
    return {
      period: 'SPRING',
      year: currentYear.toString()
    };
  }

  // Fallback (should never reach here, but just in case)
  return {
    period: 'FALL',
    year: currentYear.toString()
  };
}

/**
 * Generates the Arcadia Self Service course search URL
 * @param courseCode - The course code (e.g., "MA201")
 * @returns The complete URL with the next semester period
 */
export function getArcadiaCourseUrl(courseCode: string): string {
  const { period, year } = getNextSemester();
  const periodParam = `${year}%2F${period}`;
  return `https://selfservice.arcadia.edu/SelfService/Search/Section?&eventId=${courseCode}&period=${periodParam}`;
}

/**
 * Extracts course code from a course string (e.g., "MA 201 Calculus I" -> "MA201")
 * @param courseString - The full course string
 * @returns The course code without spaces
 */
export function extractCourseCode(courseString: string): string | null {
  // Match pattern like "MA 201" or "CS 101L" at the beginning of the string
  const match = courseString.match(/^([A-Z]+)\s+(\d+[A-Z]?)/);
  if (match) {
    return match[1] + match[2]; // Concatenate without space (e.g., "MA201")
  }
  return null;
}

/**
 * Mapping of AUC codes to their generalEd IDs in Arcadia Self-Service
 */
const AUC_ID_MAP: Record<string, number[]> = {
  'GE/GR': [23, 24], // GE and GR are separate but often combined
  'IL': [50],
  'SC': [36],
  'CE': [1],
  'CL': [5],
  'SS': [44],
  'NPL': [27],
  'W': [66],
  'QRM': [34],
  'CABR': [217]
};

/**
 * Generates the Arcadia Self Service AUC search URL(s)
 * @param aucCode - The AUC code (e.g., "GE/GR", "IL", etc.)
 * @returns Array of URLs (most will have one, GE/GR will have two)
 */
export function getArcadiaAucUrls(aucCode: string): string[] {
  const { period, year } = getNextSemester();
  const periodParam = `${year}%2F${period}`;
  
  const generalEdIds = AUC_ID_MAP[aucCode];
  if (!generalEdIds) {
    return [];
  }

  return generalEdIds.map(id => 
    `https://selfservice.arcadia.edu/SelfService/Search/Section?&period=${periodParam}&generalEd=${id}`
  );
}
