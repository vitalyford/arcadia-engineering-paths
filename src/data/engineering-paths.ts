export interface Course {
  code: string;
  name: string;
  credits: number;
  note?: string;
}

export interface CourseOption {
  courses: Course[];
  selectCount: number; // How many courses to select from this group
  note?: string;
}

export interface RequirementCategory {
  id: string;
  name: string;
  description: string;
  courses?: Course[];
  courseOptions?: CourseOption[];
  totalCredits?: number;
  note?: string;
}

export interface AUCRequirement {
  code: string;
  name: string;
  count: number;
}

export interface PreEngineeringRequirements {
  categories: RequirementCategory[];
  totalTechnicalCredits: number;
  nonTechnicalCredits: number;
  majorRequirements: string;
  transferRequirements: string;
  aucRequirements?: {
    acceleratedPrograms: AUCRequirement[];
    acceleratedNote: string;
    fourYearNote: string;
  };
}

export interface ArcadiaMajor {
  id: string;
  name: string;
  description: string;
  courses: string[];
  degreeTypes?: string[];
}

export interface PartnerProgram {
  id: string;
  name: string;
  arcadiaMajorIds: string[];
  requirements: string[];
}

export interface PartnerUniversity {
  id: string;
  name: string;
  programs: PartnerProgram[];
  requirements: {
    gpa: string;
    notes: string;
  };
  specialFeatures: {
    guaranteedAdmission: boolean;
    programTypes: string[];
    degreeInfo?: string;
    coopRequired?: boolean;
    uniqueStructure?: string;
  };
}

export const arcadiaMajors: ArcadiaMajor[] = [
  {
    id: "mathematics",
    name: "Math",
    description: "A strong foundation in mathematical principles, preparing students for advanced engineering studies.",
    degreeTypes: ["B.A.", "B.S."],
    courses: [
      // Common Curriculum (28 credits)
      "MA 201 Calculus I",
      "MA 202 Calculus II",
      "MA 203 Calculus III",
      "MA 221 Linear Algebra",
      "MA 225 Writing Mathematics: A Transition to Higher Mathematics",
      "CS 101 Problem-Solving with Algorithms and Programming I (with CS 101L Lab)",
      "MA 490 Mathematics Capstone",
      // B.A. Requirements (16 additional credits)
      "Two courses from: MA 302 Introduction to Analysis, MA 322 Abstract Algebra I, MA 341 Probability",
      "Two Mathematics electives at the 300 level",
      // B.S. Requirements (28 additional credits)
      "MA 302 Introduction to Analysis",
      "MA 322 Abstract Algebra I",
      "MA 341 Probability",
      "Three Mathematics electives at the 300 level",
      "PH 211 Conceptual Physics I"
    ]
  },
  {
    id: "computer-science",
    name: "CS",
    description: "Focuses on programming, algorithms, and data structures, essential for many engineering disciplines.",
    degreeTypes: ["B.A.", "B.S."],
    courses: [
      // Common Curriculum (44 credits)
      "CS 101 Problem-Solving with Algorithms and Programming I (with CS 101L Lab)",
      "CS 202 Problem-Solving with Algorithms and Programming II (with CS 202L Lab)",
      "CS 203 Data Structures and Algorithm Analysis (with CS 203L Lab)",
      "CS 317 Design and Analysis of Algorithms",
      "CS 341 Computer Ethics",
      "CS 354 Database Management Systems Design",
      "CS 358 Operating Systems",
      "CS 362 Computer Organization and Architecture",
      "CS 490 Capstone Course I",
      "MA 230 Discrete Structures or MA 330 Graph Theory and Combinations",
      // B.A. Requirements (8 additional credits)
      "Three Computer Science electives (two at 300+ level, one at 200+ level)",
      "CS 225 Research Writing for Computer Science (strongly recommended)",
      // B.S. Requirements (24 additional credits)
      "CS 225 Research Writing for Computer Science",
      "Four Computer Science electives (two at 300+ level, two at 200+ level)",
      "CS 315 Theory of Computation (strongly recommended)",
      "MA 201 Calculus I or MA 207 Applied Calculus I",
      "MA 202 Calculus II or MA 208 Applied Calculus II"
    ]
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "A multidisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data.",
    courses: []
  },
  {
    id: "chemistry",
    name: "Chem",
    description: "Provides a background in chemical sciences, crucial for chemical and biomedical engineering.",
    degreeTypes: ["B.S."],
    courses: [
      // Chemistry Requirements (14 courses)
      "CH 111 Conceptual Chemistry I",
      "CH 112 Conceptual Chemistry II (or CH 101/102 General Chemistry I/II with permission)",
      "CH 201 Organic Chemistry I",
      "CH 202 Organic Chemistry II",
      "CH 203 Equilibrium and Analysis",
      "CH 290 Junior Seminar",
      "CH 301 Physical Chemistry I",
      "CH 302 Physical Chemistry II",
      "CH 303 Biochemistry",
      "CH 304 Instrumental Methods of Analysis I",
      "CH 305 Inorganic Chemistry",
      "CH 391 Faculty Sponsored Research",
      "CH 392 Faculty Sponsored Research",
      "CH 490 Chemistry Capstone",
      "One elective from: CH 306 Advanced Organic Chemistry, CH 307 Polymers and Biopolymers, CH 333 Statistical Thermodynamics, CH 345 Topics in Modern Chemistry, CH 351 Chemical Physics",
      // Physics Requirements
      "PH 211 Conceptual Physics I",
      "PH 212 Conceptual Physics II",
      // Mathematics Requirements
      "MA 201 Calculus I",
      "MA 202 Calculus II",
      // Biochemistry Concentration (optional)
      "BI 101 General Biology I",
      "BI 102 General Biology II",
      "BI 204 Genetics",
      "BI 325 Cell Biology",
      "BI 333 Molecular Biology"
    ]
  },
];

export const partnerUniversities: PartnerUniversity[] = [
  {
    id: "drexel-university",
    name: "Drexel University",
    programs: [
      {
        id: "architectural",
        name: "Architectural Engineering",
        arcadiaMajorIds: ["mathematics"],
        requirements: [
          "CS 222 Introduction to Data Science with Python (with CS 222L Lab)",
          "CH 102 General Chemistry II (with CH 102L Lab)",
          "BI 101 General Biology I (with BI 101L Lab)",
          "PH 331 Engineering Mechanics",
          "3 credits Free Electives in any subject (excluding MATH 100, MATH 110, MATH 117)"
        ]
      },
      {
        id: "chemical",
        name: "Chemical Engineering",
        arcadiaMajorIds: ["chemistry", "mathematics"],
        requirements: [
          "CS 222 Introduction to Data Science with Python (with CS 222L Lab)",
          "CH 102 General Chemistry II (with CH 102L Lab)",
          "CH 201 Organic Chemistry I (with CH 201L Lab)",
          "CH 202 Organic Chemistry II (with CH 202L Lab)",
          "BIO Elective (BI 101, BI 102, or BI 2xx level course)",
          "6 credits Engineering/Science Electives (200-499 level): Biology, Chemistry, Mathematics, Computer Science, Physics, or courses approved by engineering advisor",
          "6 credits Engineering/Science Electives (300-499 level): Biology, Chemistry, Mathematics, Computer Science, Physics, or courses approved by engineering advisor"
        ]
      },
      {
        id: "civil",
        name: "Civil Engineering",
        arcadiaMajorIds: ["mathematics"],
        requirements: [
          "CS 222 Introduction to Data Science with Python (with CS 222L Lab)",
          "CH 102 General Chemistry II (with CH 102L Lab)",
          "BI 101 General Biology I (with BI 101L Lab)",
          "PH 331 Engineering Mechanics",
          "6 credits Free Electives in any subject (excluding MATH 100, MATH 110)"
        ]
      },
      {
        id: "computer",
        name: "Computer Engineering",
        arcadiaMajorIds: ["computer-science", "mathematics"],
        requirements: [
          "CS 222 Introduction to Data Science with Python (with CS 222L Lab)",
          "CS 203 Data Structures and Algorithm Analysis (with CS 203L Lab)",
          "PH 341 Electronic Circuit Analysis I",
          "CM 110 Speech Communications OR CS 225 Research Writing",
          "27 credits Free Electives in any subject (excluding MATH 100, MATH 110)"
        ]
      },
      {
        id: "electrical",
        name: "Electrical Engineering",
        arcadiaMajorIds: ["computer-science", "mathematics"],
        requirements: [
          "CS 222 Introduction to Data Science with Python (with CS 222L Lab)",
          "CS 203 Data Structures and Algorithm Analysis (with CS 203L Lab)",
          "PH 341 Electronic Circuit Analysis I",
          "CM 110 Speech Communications OR CS 225 Research Writing",
          "27 credits Free Electives in any subject (excluding MA 100, MA 110, MA 117)"
        ]
      },
      {
        id: "environmental",
        name: "Environmental Engineering",
        arcadiaMajorIds: ["chemistry", "mathematics"],
        requirements: [
          "CS 222 Introduction to Data Science with Python (with CS 222L Lab)",
          "CH 102 General Chemistry II (with CH 102L Lab)",
          "CH 201 Organic Chemistry I (with CH 201L Lab)",
          "CH 202 Organic Chemistry II (with CH 202L Lab)",
          "PH 212 Physics II (with PH 212L Lab)",
          "BI 101 General Biology I (with BI 101L Lab)",
          "6 credits Engineering/Science Electives (200-499 level): Biology, Chemistry, Computer Science, Mathematics, Physics, or courses approved by ENVE advisor",
          "6 credits Engineering/Science Electives (300-499 level): Biology, Chemistry, Computer Science, Mathematics, Physics, or courses approved by ENVE advisor"
        ]
      },
      {
        id: "materials-science",
        name: "Materials Science & Engineering",
        arcadiaMajorIds: ["chemistry", "mathematics"],
        requirements: [
          "CS 222 Introduction to Data Science with Python (with CS 222L Lab)",
          "CH 102 General Chemistry II (with CH 102L Lab)",
          "CH 201 Organic Chemistry I (with CH 201L Lab)",
          "BI 101 General Biology I (with BI 101L Lab)",
          "6 credits Free Electives in any subject (excluding MA 100, MA 110, MA 117, CH 100)"
        ]
      },
      {
        id: "mechanical",
        name: "Mechanical Engineering",
        arcadiaMajorIds: ["mathematics"],
        requirements: [
          "CS 222 Introduction to Data Science with Python (with CS 222L Lab)",
          "CH 102 General Chemistry II (with CH 102L Lab)",
          "PH 212 Physics II (with PH 212L Lab)",
          "PH 331 Engineering Mechanics",
          "MATH Elective (MATH 291, MATH 300, MATH 321, MATH 322, or MATH 323)",
          "6 credits Free Electives in any subject (excluding MA 100, MA 110, MA 117, CH 100)"
        ]
      },
    ],
    requirements: {
      gpa: "N/A",
      notes: "No specific GPA mentioned, but a strong academic record is expected. Students must submit an Intent to Enroll form during their second year to inform the Drexel College of Engineering of their intent to transfer and indicate their engineering program of interest.",
    },
    specialFeatures: {
      guaranteedAdmission: true,
      programTypes: ["3+3", "4+3"],
      degreeInfo: "BS from Arcadia + BS from Drexel",
      coopRequired: true,
      uniqueStructure: "Includes 1 co-op (practicum) year out of the 3 years at Drexel"
    },
  },
  {
    id: "university-of-pittsburgh",
    name: "University of Pittsburgh",
    programs: [
      { id: "bioengineering", name: "Bioengineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: ["BI 101 General Biology I", "BI 102 General Biology II", "BI 206 Human Physiology", "CH 201 Organic Chemistry I", "CH 202 Organic Chemistry II", "MA 341 Probability", "MA 342 Mathematical Statistics I", "PH 331 Engineering Mechanics", "Plus two elective courses in advanced life science, computer science, or mathematics."] },
      { id: "chemical-pitt", name: "Chemical Engineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: ["CH 201 Organic Chemistry I", "CH 202 Organic Chemistry II", "CH 203 Equilibrium and Analysis", "CH 301 Physical Chemistry I", "CH 302 Physical Chemistry II", "CH 303 Biochemistry", "MA 341 Probability", "MA 342 Mathematical Statistics I", "PH 331 Engineering Mechanics", "Plus two elective courses in advanced life science, computer science, or mathematics."] },
      { id: "civil-environmental-pitt", name: "Civil & Environmental Engineering", arcadiaMajorIds: ["mathematics", "chemistry"], requirements: ["MA 341 Probability", "MA 342 Mathematical Statistics I", "PH 325 Mathematical Physics", "PH 331 Engineering Mechanics", "PH 341 Electronic Circuit Analysis I", "ENGR 0131, 0141, 0151 (taken while at PITT)", "Plus one of the following: BI 101 General Biology I or PH 223 Essentials of Physical Geology."] },
      { id: "computer-pitt", name: "Computer Engineering", arcadiaMajorIds: ["computer-science", "mathematics"], requirements: ["EN 201 Thought and Expression II", "Plus two elective courses in advanced life science, computer science, or mathematics.", "Plus two elective courses in the arts and humanities."] },
      { id: "electrical-pitt", name: "Electrical Engineering", arcadiaMajorIds: ["computer-science", "mathematics"], requirements: ["MA 341 Probability", "MA 342 Mathematical Statistics I", "EN 201 Thought and Expression II", "Plus three elective courses in advanced life science, computer science, or mathematics.", "Plus one elective course in the arts and humanities."] },
      { id: "engineering-science-nano", name: "Engineering Science – Nanotechnology", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: ["MATH 1560 Complex Variable (taken while at PITT)", "ENGR 0020 Materials Structures (taken while at PITT)", "MA 341 Probability", "MA 342 Mathematical Statistics I", "Plus three of the following: CH 201 Organic Chemistry I, CH 202 Organic Chemistry II, CH 301 Physical Chemistry I, CH 302 Physical Chemistry II, CH 303 Biochemistry, CH 305 Inorganic Chemistry."] },
      { id: "industrial", name: "Industrial Engineering", arcadiaMajorIds: ["mathematics"], requirements: ["MA 341 Probability", "MA 342 Mathematical Statistics I", "PH 341 Electronic Circuit Analysis I", "Plus one course in public speaking, communications, or discussion.", "Plus two elective courses in advanced life science, computer science, or mathematics.", "PH 331 Engineering Mechanics."] },
      { id: "materials-science-pitt", name: "Materials Science & Engineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: ["MA 341 Probability", "MA 342 Mathematical Statistics I", "PH 341 Electronic Circuit Analysis I", "PL 175 Introduction to Ethics", "ENGR 0131, 0141 (taken while at PITT)", "Plus one course in public speaking, communications, or discussion.", "PH 331 Engineering Mechanics."] },
      { id: "mechanical-pitt", name: "Mechanical Engineering", arcadiaMajorIds: ["mathematics"], requirements: ["PH 331 Engineering Mechanics", "PH 341 Electronic Circuit Analysis I", "PL 175 Introduction to Ethics", "ENGR 0131, 0141, MEMS 1015 (taken while at PITT)", "Plus one course in public speaking, communications, or discussion."] },
    ],
    requirements: {
      gpa: "3.00 (3.50 for Bioengineering)",
      notes: "A GPA of 3.00 or higher in both prerequisite and overall GPA (3.50 for Bioengineering), with only grades of C or better eligible for transfer. At least two years of full-time study at Arcadia and a favorable recommendation from the program adviser are also required.\n\nThe University of Pittsburgh provides a code to waive the admission fee for dual degree programs. Please contact Arcadia's engineering program liaison to request this code.",
    },
    specialFeatures: {
      guaranteedAdmission: true,
      programTypes: ["3+2", "4+2"],
      degreeInfo: "BS from Arcadia + BS from University of Pittsburgh"
    },
  },
  {
    id: "washington-university-in-st-louis",
    name: "Washington University in St. Louis",
    programs: [
      { id: "biochemical", name: "Biochemical Engineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: ["BI 101 General Biology I", "BI 102 General Biology II", "CH 102 General Chemistry II or CH 112 Conceptual Chemistry II"] },
      { id: "chemical-washu", name: "Chemical Engineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: ["BI 101 General Biology I", "CH 102 General Chemistry II or CH 112 Conceptual Chemistry II", "CH 201 Organic Chemistry I"] },
      { id: "computer-washu", name: "Computer Engineering", arcadiaMajorIds: ["computer-science", "mathematics"], requirements: ["CS 202 Problem-Solving with Algorithms and Programming II (with CS 202L Lab)"] },
      { id: "computer-science-washu", name: "Computer Science", arcadiaMajorIds: ["computer-science", "mathematics"], requirements: ["CS 202 Problem-Solving with Algorithms and Programming II (with CS 202L Lab)"] },
      { id: "electrical-washu", name: "Electrical Engineering", arcadiaMajorIds: ["computer-science", "mathematics"], requirements: [] },
      { id: "mechanical-washu", name: "Mechanical Engineering", arcadiaMajorIds: ["mathematics"], requirements: ["One Physics course at 300 level"] },
      { id: "systems-science", name: "Systems Science and Engineering", arcadiaMajorIds: ["mathematics", "computer-science"], requirements: [] },
    ],
    requirements: {
      gpa: "3.25",
      notes: "A GPA of 3.25 or higher in both prerequisite and overall GPA, with only grades of C or better eligible for transfer. At least two years of full-time study at Arcadia and two letters of recommendation (including one from the program adviser) are required.\n\nApplications open in December each year, and students should apply only after Fall semester grades appear on their transcript. For more information, including the online application, scholarship details, merit scholarship opportunities, and letters of recommendation guidelines, visit: https://engineering.washu.edu/academics/dual-degree-program/application.html",
    },
    specialFeatures: {
      guaranteedAdmission: true,
      programTypes: ["3+3", "4+3"],
      degreeInfo: "BS from Arcadia + BS and MS from Washington University",
      uniqueStructure: "Guarantees 50% discount on tuition including for international students"
    },
  },
  {
    id: "dartmouth-college",
    name: "Dartmouth College",
    programs: [
      { id: "biomedical", name: "Biomedical Engineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: [] },
      { id: "biological", name: "Biological Engineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: [] },
      { id: "chemical-dartmouth", name: "Chemical Engineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: [] },
      { id: "computer-dartmouth", name: "Computer Engineering", arcadiaMajorIds: ["computer-science", "mathematics"], requirements: [] },
      { id: "electrical-dartmouth", name: "Electrical Engineering", arcadiaMajorIds: ["computer-science", "mathematics"], requirements: [] },
      { id: "energy", name: "Energy Engineering", arcadiaMajorIds: ["mathematics"], requirements: [] },
      { id: "environmental-dartmouth", name: "Environmental Engineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: [] },
      { id: "materials-dartmouth", name: "Materials Engineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: [] },
      { id: "mechanical-dartmouth", name: "Mechanical Engineering", arcadiaMajorIds: ["mathematics"], requirements: [] },
    ],
    requirements: {
      gpa: "N/A",
      notes: "Students are encouraged to apply. No specific requirements mentioned.",
    },
    specialFeatures: {
      guaranteedAdmission: false,
      programTypes: ["2+1+1+1", "3+2"],
      degreeInfo: "BS from Arcadia + BS from Dartmouth",
      uniqueStructure: "2+1+1+1: 2 years at Arcadia, 1 at Dartmouth, 1 at Arcadia, 1 final at Dartmouth"
    },
  },
  {
    id: "columbia-university",
    name: "Columbia University",
    programs: [
      { id: "applied-mathematics", name: "Applied Mathematics", arcadiaMajorIds: ["mathematics"], requirements: ["PH 324 Quantum Physics", "Plus one of the following: PH 325 Mathematical Physics, PH 331 Engineering Mechanics, PH 341 Electronic Circuit Analysis I"] },
      { id: "applied-physics", name: "Applied Physics", arcadiaMajorIds: ["mathematics"], requirements: ["PH 324 Quantum Physics", "Plus one of the following: PH 325 Mathematical Physics, PH 331 Engineering Mechanics, PH 341 Electronic Circuit Analysis I"] },
      { id: "biomedical-columbia", name: "Biomedical Engineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: ["PH 324 Quantum Physics", "CH 102 General Chemistry II or CH 112 Conceptual Chemistry II", "BI 101 General Biology I", "BI 102 General Biology II", "ELEN E1201 Intro to Electrical Engineering (taken while at Columbia)"] },
      { id: "chemical-columbia", name: "Chemical Engineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: ["CH 102 General Chemistry II", "CH 112 Conceptual Chemistry II", "CH 201 Organic Chemistry I", "CH 202 Organic Chemistry II", "PH 325 Mathematical Physics"] },
      { id: "civil-columbia", name: "Civil Engineering", arcadiaMajorIds: ["mathematics"], requirements: ["PH 331 Engineering Mechanics"] },
      { id: "computer-columbia", name: "Computer Engineering", arcadiaMajorIds: ["computer-science", "mathematics"], requirements: ["MA 230 Discrete Structures", "ELEN 1201 Intro Electrical Engineering (taken while at Columbia)"] },
      { id: "computer-science-columbia", name: "Computer Science", arcadiaMajorIds: ["computer-science", "mathematics"], requirements: ["CS 203 Data Structures and Algorithm Analysis (with CS 203L Lab)", "MA 230 Discrete Structures"] },
      { id: "earth-environmental", name: "Earth and Environmental Engineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: ["CH 102 General Chemistry II or CH 112 Conceptual Chemistry II", "MA 341 Probability", "MA 342 Mathematical Statistics I", "Plus one of the following: BI 101 General Biology I, CH 201 Organic Chemistry I, PH 324 Quantum Physics"] },
      { id: "electrical-columbia", name: "Electrical Engineering", arcadiaMajorIds: ["computer-science", "mathematics"], requirements: ["PH 324 Quantum Physics", "CS 202 Problem-Solving with Algorithms and Programming II (with CS 202L Lab)", "ELEN 1201 Intro Electrical Engineering (taken while at Columbia)"] },
      { id: "engineering-mechanics", name: "Engineering Mechanics", arcadiaMajorIds: ["mathematics"], requirements: ["PH 331 Engineering Mechanics"] },
      { id: "engineering-management-systems", name: "Engineering Management Systems", arcadiaMajorIds: ["mathematics", "computer-science"], requirements: ["MA 341 Probability", "MA 342 Mathematical Statistics I", "CS 203 Data Structures and Algorithm Analysis (with CS 203L Lab)"] },
      { id: "industrial-operations-research", name: "Industrial Engineering and Operations Research", arcadiaMajorIds: ["mathematics", "computer-science"], requirements: ["MA 341 Probability", "MA 342 Mathematical Statistics I", "CS 203 Data Structures and Algorithm Analysis (with CS 203L Lab)"] },
      { id: "materials-science-columbia", name: "Materials Science and Engineering", arcadiaMajorIds: ["chemistry", "mathematics"], requirements: ["CH 102 General Chemistry II or CH 112 Conceptual Chemistry II", "PH 324 Quantum Physics"] },
      { id: "mechanical-columbia", name: "Mechanical Engineering", arcadiaMajorIds: ["mathematics"], requirements: ["PH 331 Engineering Mechanics", "PH 324 Quantum Physics", "ELEN 1201 Intro Electrical Engineering (taken while at Columbia)"] },
    ],
    requirements: {
      gpa: "3.30",
      notes: "A GPA of 3.30 or higher in both prerequisite and overall GPA. Each common required curriculum course must be taken at Arcadia with a grade of B or higher on the first attempt. Three letters of recommendation (program adviser, mathematics professor, and science professor) are also required. Students entering Arcadia after the 2017-2018 academic year are no longer eligible for guaranteed admission.",
    },
    specialFeatures: {
      guaranteedAdmission: false,
      programTypes: ["3+2", "4+2"],
      degreeInfo: "BS from Arcadia + BS from Columbia"
    },
  },
];

export const preEngineeringRequirements: PreEngineeringRequirements = {
  categories: [
    {
      id: "mathematics",
      name: "Mathematics",
      description: "Five required mathematics courses providing the foundation for engineering studies",
      courses: [
        { code: "MA 201", name: "Calculus I", credits: 4 },
        { code: "MA 202", name: "Calculus II", credits: 4 },
        { code: "MA 203", name: "Calculus III", credits: 4 },
        { code: "MA 221", name: "Linear Algebra", credits: 4 },
        { code: "MA 352", name: "Differential Equations", credits: 4 }
      ],
      totalCredits: 20
    },
    {
      id: "chemistry",
      name: "Chemistry",
      description: "Two chemistry courses - one from each sequence",
      courseOptions: [
        {
          courses: [
            { code: "CH 101", name: "General Chemistry I", credits: 4 },
            { code: "CH 111", name: "Conceptual Chemistry I", credits: 4 }
          ],
          selectCount: 1,
          note: "Choose one introductory chemistry course"
        },
        {
          courses: [
            { code: "CH 102", name: "General Chemistry II", credits: 4 },
            { code: "CH 112", name: "Conceptual Chemistry II", credits: 4 }
          ],
          selectCount: 1,
          note: "Choose the corresponding second-semester course"
        }
      ],
      totalCredits: 8,
      note: "*CH 101/102 sequence required by PITT, highly recommended otherwise"
    },
    {
      id: "physics",
      name: "Physics",
      description: "Two physics courses covering fundamental concepts",
      courses: [
        { code: "PH 211", name: "Conceptual Physics I", credits: 4 },
        { code: "PH 212", name: "Physics II", credits: 4 }
      ],
      totalCredits: 8
    },
    {
      id: "computer-science",
      name: "Computer Science",
      description: "One computer science course with lab component",
      courses: [
        { code: "CS 101", name: "Problem-Solving with Algorithms and Programming I (with CS 101L Lab)", credits: 4 }
      ],
      totalCredits: 4
    },
    {
      id: "economics",
      name: "Economics",
      description: "One economics course covering macroeconomic principles",
      courses: [
        { code: "EC 210", name: "Principles of Macroeconomics", credits: 4 }
      ],
      totalCredits: 4
    }
  ],
  totalTechnicalCredits: 44,
  nonTechnicalCredits: 28,
  majorRequirements: "All students must satisfy the requirements for a major, typically Mathematics, Computer Science, Data Science, or Chemistry at Arcadia University, as well as those of the Undergraduate Curriculum. However, students accepted into an engineering program after three years need fulfill only those parts of the Undergraduate Curriculum required for transfer students entering with 57 or more credits.",
  transferRequirements: "These courses should include 3 different academic disciplines, two courses from the same department, and at least one should be a non-introductory course.",
  aucRequirements: {
    acceleratedPrograms: [
      { code: "GE/GR", name: "Global Connections Experience / Reflection", count: 1 },
      { code: "IL", name: "Integrative Learning Experiences", count: 1 },
      { code: "SC", name: "Senior Capstone", count: 1 },
      { code: "CE", name: "Creative Expressions", count: 1 },
      { code: "CL", name: "Cultural Legacies", count: 1 },
      { code: "SS", name: "Self and Society", count: 1 },
      { code: "NPL", name: "Natural and Physical World with Lab", count: 1 },
      { code: "QRM", name: "Quantitative Reasoning Mathematics", count: 1 },
      { code: "W", name: "Writing", count: 1 },
      { code: "CABR", name: "Combatting Anti-Black Racism", count: 1 }
    ],
    acceleratedNote: "Students in 3+2 and 3+3 programs need to complete only these reduced AUC requirements during their time at Arcadia.",
    fourYearNote: "Students who decide to stay at Arcadia for 4 years must complete the full AUC requirements as required for all Arcadia students."
  }
};
