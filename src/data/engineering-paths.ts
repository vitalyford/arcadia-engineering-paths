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
}

export const arcadiaMajors: ArcadiaMajor[] = [
  {
    id: "mathematics",
    name: "Mathematics",
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
    name: "Computer Science",
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
    name: "Chemistry",
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
          // Foundation Engineering Courses Required for All Majors
          "MATH 121 Calculus 1 — 4 credits",
          "MATH 122 Calculus 2 — 4 credits", 
          "MATH 200 Multivariate Calculus — 4 credits",
          "ECE 231/CAEE 231/MATH201 Linear Algebra — 3-4 credits",
          "ECE 232/CAEE 232/MATH210 Differential Equations — 3-4 credits",
          "PHYS 101 Fundamentals of Physics I — 4 credits",
          "PHYS 102 Fundamentals of Physics II — 4 credits",
          "CHEM 101 General Chemistry I — 3.5 credits",
          "ENGR 111 Engineering Design & Data Analysis — 3 credits",
          "ENGR 131 Programming for Engineers (Programming in Python) — 3 credits",
          "ENGL 101 English Composition I — 3 credits",
          "ENGL 102 English Composition II — 3 credits",
          "ENGL 103 English Composition III — 3 credits",
          "At least 12 credits of General Education Elective credits (non-technical)",
          // Architectural Engineering Specific Requirements
          "CHEM 102 General Chemistry 2 — 4.5 credits",
          "PHYS 201 Fundamentals of Physics III — 4 credits",
          "BIO 141 Essential Biology — 4.5 credits",
          "MEM 202 Statics — 3 credits",
          "MEM 238 Dynamics — 4 credits",
          "3 credits Free Electives in any subject (excluding remedial/preparatory courses)"
        ] 
      },
      { 
        id: "chemical", 
        name: "Chemical Engineering", 
        arcadiaMajorIds: ["chemistry", "mathematics"], 
        requirements: [
          // Foundation Engineering Courses Required for All Majors
          "MATH 121 Calculus 1 — 4 credits",
          "MATH 122 Calculus 2 — 4 credits", 
          "MATH 200 Multivariate Calculus — 4 credits",
          "ECE 231/CAEE 231/MATH201 Linear Algebra — 3-4 credits",
          "ECE 232/CAEE 232/MATH210 Differential Equations — 3-4 credits",
          "PHYS 101 Fundamentals of Physics I — 4 credits",
          "PHYS 102 Fundamentals of Physics II — 4 credits",
          "CHEM 101 General Chemistry I — 3.5 credits",
          "ENGR 111 Engineering Design & Data Analysis — 3 credits",
          "ENGR 131 Programming for Engineers (Programming in Python) — 3 credits",
          "ENGL 101 English Composition I — 3 credits",
          "ENGL 102 English Composition II — 3 credits",
          "ENGL 103 English Composition III — 3 credits",
          "At least 12 credits of General Education Elective credits (non-technical)",
          // Chemical Engineering Specific Requirements
          "CHEM 102 General Chemistry 2 — 4.5 credits",
          "CHEM 241 Organic Chemistry I — 4 credits",
          "CHEM 242 Organic Chemistry II — 4 credits",
          "BIO Elective — 3-4.5 credits (BIO 100, BIO 101, BIO 122, or BIO 141)",
          "6 credits Engineering/Science Electives (200-499): ACCT, AE, BIO, BLAW, BMES, BUSN, CAEE, CHEM, CIVE, CMGT, CS, CT, ECE, ECEC, ECEE, ECEP, ECES, ECON, EET, EGMT, ENSS, ENVE, ENVS, FDSC, FIN GEO, INDE, INFO, INTB, MATE, MATH, MEM (except MEM 310), MET MGMT, MIS, MKTG, NFS, ORGB, OPM, PBHL, PENG, PHYS, SE, or CHE 399-380, CHE 1399, CHE T480, ENGR 370, or courses approved by CHE advisor",
          "6 credits Engineering/Science Electives (300-499): AE, BIO, BMES, CAEE, CHEM, CIVE, CMGT, CS, CT, ECE, ECEC, ECEE, ECEP, ECES, EET, EGMT, ENSS, ENVE, ENVS, FDSC, GEO INDE, INFO, MATE, MATH, MEM (except MEM 310), MET, NFS, PBHL, PENG, PHYS, SE, or CHE 360, CHE 373, CHE 452, CHE 460, CHE 399-480, CHE 1399, CHE T480, CHEM 230, CHEM 231 [WI], CHEM 243, ENGR 370, or courses approved by CHE advisor"
        ] 
      },
      { 
        id: "civil", 
        name: "Civil Engineering", 
        arcadiaMajorIds: ["mathematics"], 
        requirements: [
          // Foundation Engineering Courses Required for All Majors
          "MATH 121 Calculus 1 — 4 credits",
          "MATH 122 Calculus 2 — 4 credits", 
          "MATH 200 Multivariate Calculus — 4 credits",
          "ECE 231/CAEE 231/MATH201 Linear Algebra — 3-4 credits",
          "ECE 232/CAEE 232/MATH210 Differential Equations — 3-4 credits",
          "PHYS 101 Fundamentals of Physics I — 4 credits",
          "PHYS 102 Fundamentals of Physics II — 4 credits",
          "CHEM 101 General Chemistry I — 3.5 credits",
          "ENGR 111 Engineering Design & Data Analysis — 3 credits",
          "ENGR 131 Programming for Engineers (Programming in Python) — 3 credits",
          "ENGL 101 English Composition I — 3 credits",
          "ENGL 102 English Composition II — 3 credits",
          "ENGL 103 English Composition III — 3 credits",
          "At least 12 credits of General Education Elective credits (non-technical)",
          // Civil Engineering Specific Requirements
          "CHEM 102 General Chemistry 2 — 4.5 credits",
          "PHYS 201 Fundamentals of Physics III — 4 credits",
          "BIO 141 Essential Biology — 4.5 credits",
          "MEM 202 Statics — 3 credits",
          "MEM 238 Dynamics — 4 credits",
          "6 credits Free Electives in any subject (excluding remedial/preparatory courses)"
        ] 
      },
      { 
        id: "computer", 
        name: "Computer Engineering", 
        arcadiaMajorIds: ["computer-science", "mathematics"], 
        requirements: [
          // Foundation Engineering Courses Required for All Majors
          "MATH 121 Calculus 1 — 4 credits",
          "MATH 122 Calculus 2 — 4 credits", 
          "MATH 200 Multivariate Calculus — 4 credits",
          "ECE 231/CAEE 231/MATH201 Linear Algebra — 3-4 credits",
          "ECE 232/CAEE 232/MATH210 Differential Equations — 3-4 credits",
          "PHYS 101 Fundamentals of Physics I — 4 credits",
          "PHYS 102 Fundamentals of Physics II — 4 credits",
          "CHEM 101 General Chemistry I — 3.5 credits",
          "ENGR 111 Engineering Design & Data Analysis — 3 credits",
          "ENGR 131 Programming for Engineers (Programming in Python) — 3 credits",
          "ENGL 101 English Composition I — 3 credits",
          "ENGL 102 English Composition II — 3 credits",
          "ENGL 103 English Composition III — 3 credits",
          "At least 12 credits of General Education Elective credits (non-technical)",
          // Computer Engineering Specific Requirements
          "PHYS 201 Fundamentals of Physics III — 4 credits",
          "ECE 105 Programming for Engineers 2 — 3 credits",
          "CS 260 Data Structures — 3 credits",
          "ECE 201 Foundations of Electric Circuits I — 4 credits",
          "COM 230 Public Speaking — 3 credits OR COM 310 Technical Communication — 3 credits",
          "27 credits Free Electives in any subject (excluding remedial/preparatory courses)"
        ] 
      },
      { 
        id: "electrical", 
        name: "Electrical Engineering", 
        arcadiaMajorIds: ["computer-science", "mathematics"], 
        requirements: [
          // Foundation Engineering Courses Required for All Majors
          "MATH 121 Calculus 1 — 4 credits",
          "MATH 122 Calculus 2 — 4 credits", 
          "MATH 200 Multivariate Calculus — 4 credits",
          "ECE 231/CAEE 231/MATH201 Linear Algebra — 3-4 credits",
          "ECE 232/CAEE 232/MATH210 Differential Equations — 3-4 credits",
          "PHYS 101 Fundamentals of Physics I — 4 credits",
          "PHYS 102 Fundamentals of Physics II — 4 credits",
          "CHEM 101 General Chemistry I — 3.5 credits",
          "ENGR 111 Engineering Design & Data Analysis — 3 credits",
          "ENGR 131 Programming for Engineers (Programming in Python) — 3 credits",
          "ENGL 101 English Composition I — 3 credits",
          "ENGL 102 English Composition II — 3 credits",
          "ENGL 103 English Composition III — 3 credits",
          "At least 12 credits of General Education Elective credits (non-technical)",
          // Electrical Engineering Specific Requirements
          "PHYS 201 Fundamentals of Physics III — 4 credits",
          "ECE 105 Programming for Engineers 2 — 3 credits",
          "CS 260 Data Structures (Core Elective option) — 3 credits",
          "ECE 201 Foundations of Electric Circuits I — 4 credits",
          "COM 230 Public Speaking — 3 credits OR COM 310 Technical Communication — 3 credits",
          "27 credits Free Electives in any subject (excluding remedial/preparatory courses)"
        ] 
      },
      { 
        id: "environmental", 
        name: "Environmental Engineering", 
        arcadiaMajorIds: ["chemistry", "mathematics"], 
        requirements: [
          // Foundation Engineering Courses Required for All Majors
          "MATH 121 Calculus 1 — 4 credits",
          "MATH 122 Calculus 2 — 4 credits", 
          "MATH 200 Multivariate Calculus — 4 credits",
          "ECE 231/CAEE 231/MATH201 Linear Algebra — 3-4 credits",
          "ECE 232/CAEE 232/MATH210 Differential Equations — 3-4 credits",
          "PHYS 101 Fundamentals of Physics I — 4 credits",
          "PHYS 102 Fundamentals of Physics II — 4 credits",
          "CHEM 101 General Chemistry I — 3.5 credits",
          "ENGR 111 Engineering Design & Data Analysis — 3 credits",
          "ENGR 131 Programming for Engineers (Programming in Python) — 3 credits",
          "ENGL 101 English Composition I — 3 credits",
          "ENGL 102 English Composition II — 3 credits",
          "ENGL 103 English Composition III — 3 credits",
          "At least 12 credits of General Education Elective credits (non-technical)",
          // Environmental Engineering Specific Requirements
          "CHEM 102 General Chemistry 2 — 4.5 credits",
          "CHEM 241 Organic Chemistry I — 4 credits",
          "CHEM 242 Organic Chemistry II — 4 credits",
          "PHYS 201 Fundamentals of Physics III — 4 credits",
          "BIO 141 Essential Biology — 4.5 credits",
          "6.0 credits Engineering/Science Electives (200-499): AE, BIO, BMES, CHE, CHEM, CIVE, CS, ECE, ECEP, ECEE, ECES, ECEC, GEO, ENVE, ENVS, INFO, MATE, MATH, MEM, PHYS, SE or courses approved by ENVE advisor",
          "6.0 credits Engineering/Science Electives (300-499): AE, BIO, BMES, CHE, CHEM, CIVE, CS, ECE, ECEP, ECEE, ECES, ECEC, GEO, ENVE, ENVS, INFO, MATE, MATH, MEM, PHYS, SE, or PBHL305, PBHL 314, PBHL 317, PBHL 321, PBHL 350, PBHL 457 or courses approved by ENVE advisor"
        ] 
      },
      { 
        id: "materials-science", 
        name: "Materials Science & Engineering", 
        arcadiaMajorIds: ["chemistry", "mathematics"], 
        requirements: [
          // Foundation Engineering Courses Required for All Majors
          "MATH 121 Calculus 1 — 4 credits",
          "MATH 122 Calculus 2 — 4 credits", 
          "MATH 200 Multivariate Calculus — 4 credits",
          "ECE 231/CAEE 231/MATH201 Linear Algebra — 3-4 credits",
          "ECE 232/CAEE 232/MATH210 Differential Equations — 3-4 credits",
          "PHYS 101 Fundamentals of Physics I — 4 credits",
          "PHYS 102 Fundamentals of Physics II — 4 credits",
          "CHEM 101 General Chemistry I — 3.5 credits",
          "ENGR 111 Engineering Design & Data Analysis — 3 credits",
          "ENGR 131 Programming for Engineers (Programming in Python) — 3 credits",
          "ENGL 101 English Composition I — 3 credits",
          "ENGL 102 English Composition II — 3 credits",
          "ENGL 103 English Composition III — 3 credits",
          "At least 12 credits of General Education Elective credits (non-technical)",
          // Materials Science & Engineering Specific Requirements
          "CHEM 102 General Chemistry 2 — 4.5 credits",
          "CHEM 241 Organic Chemistry I — 4 credits",
          "PHYS 201 Fundamentals of Physics III — 4 credits",
          "BIO 107/108 Cells, Genetics & Physiology/Lab — 3/1 credits",
          "6 credits Free Electives in any subject (excluding remedial/preparatory courses)"
        ] 
      },
      { 
        id: "mechanical", 
        name: "Mechanical Engineering", 
        arcadiaMajorIds: ["mathematics"], 
        requirements: [
          // Foundation Engineering Courses Required for All Majors
          "MATH 121 Calculus 1 — 4 credits",
          "MATH 122 Calculus 2 — 4 credits", 
          "MATH 200 Multivariate Calculus — 4 credits",
          "ECE 231/CAEE 231/MATH201 Linear Algebra — 3-4 credits",
          "ECE 232/CAEE 232/MATH210 Differential Equations — 3-4 credits",
          "PHYS 101 Fundamentals of Physics I — 4 credits",
          "PHYS 102 Fundamentals of Physics II — 4 credits",
          "CHEM 101 General Chemistry I — 3.5 credits",
          "ENGR 111 Engineering Design & Data Analysis — 3 credits",
          "ENGR 131 Programming for Engineers (Programming in Python) — 3 credits",
          "ENGL 101 English Composition I — 3 credits",
          "ENGL 102 English Composition II — 3 credits",
          "ENGL 103 English Composition III — 3 credits",
          "At least 12 credits of General Education Elective credits (non-technical)",
          // Mechanical Engineering Specific Requirements
          "CHEM 102 General Chemistry 2 — 4.5 credits",
          "PHYS 201 Fundamentals of Physics III — 4 credits",
          "MEM 202 Statics — 3 credits",
          "MEM 238 Dynamics — 4 credits",
          "MATH Elective — 3-4 credits (MATH 291, MATH 300, MATH 321, MATH 322, or MATH 323)",
          "6 credits Free Electives in any subject (excluding remedial/preparatory courses)"
        ] 
      },
    ],
    requirements: {
      gpa: "N/A",
      notes: "No specific GPA mentioned, but a strong academic record is expected.",
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
      notes: "A GPA of 3.00 or higher in both prerequisite and overall GPA (3.50 for Bioengineering), with only grades of C or better eligible for transfer. At least two years of full-time study at Arcadia and a favorable recommendation from the program adviser are also required.",
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
      notes: "A GPA of 3.25 or higher in both prerequisite and overall GPA, with only grades of C or better eligible for transfer. At least two years of full-time study at Arcadia and two letters of recommendation (including one from the program adviser) are required.",
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
  },
];
