### Project: Arcadia University Engineering Pathways Visualizer

**1. Project Overview**

A Next.js application to visualize the dual-degree engineering programs offered by Arcadia University in partnership with other universities. The application will feature an interactive, force-directed graph that allows prospective students to explore different academic paths, understand requirements, and navigate their options easily. The goal is to provide a clear, intuitive, and visually appealing experience.

**2. Technology Stack**

*   **Framework:** Next.js (with TypeScript)
*   **Styling:** Tailwind CSS v4
*   **Visualization Library:** D3.js for its power and flexibility in creating custom interactive data visualizations. I'll use it with React to create a dynamic and responsive graph.
*   **State Management:** React Context and/or `useState` for managing the application's state, such as the currently selected node and zoom level.
*   **Deployment:** Vercel (recommended for Next.js)

**3. Data Model**

I will create a structured data model in a `data.ts` file. This data will be based on the information from the provided URLs. The model will define the relationships between Arcadia's majors, partner universities, and their respective engineering programs.

```typescript
// C:/Users/Vitaly/Desktop/pre-engineering/data/engineering-paths.ts

export interface ArcadiaMajor {
  id: string;
  name: string;
  description: string;
}

export interface PartnerProgram {
  id: string;
  name: string;
  arcadiaMajorIds: string[];
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
  // Data to be populated from the website
];

export const partnerUniversities: PartnerUniversity[] = [
  // Data to be populated from the website
];
```

**4. Project Structure**

I will follow a modular and scalable project structure:

```
/
|-- app/
|   |-- page.tsx                # Main page with the visualization
|   |-- layout.tsx              # Root layout
|   |-- globals.css             # Global styles
|-- components/
|   |-- graph/
|   |   |-- EngineeringGraph.tsx # The main D3 graph component
|   |   |-- Node.tsx             # Component for a single node
|   |   |-- Edge.tsx             # Component for an edge
|   |-- ui/
|   |   |-- Breadcrumbs.tsx      # Breadcrumbs for navigation
|   |   |-- InfoPanel.tsx        # Panel to show details of a selected node
|   |   |-- Header.tsx           # Application header
|   |   |-- ZoomControls.tsx     # Buttons for zooming in and out
|-- data/
|   |-- engineering-paths.ts    # The structured data for the application
|-- hooks/
|   |-- useGraph.ts             # Custom hook to manage graph logic
|-- lib/
|   |-- d3-utils.ts             # Utility functions for D3
|-- styles/
|   |-- tailwind.css            # Tailwind CSS configuration
```

**5. Implementation Steps**

1.  **Setup Next.js Project:** Initialize a new Next.js project with TypeScript and Tailwind CSS v4.
2.  **Populate Data:** Scrape the provided URLs for the engineering program data and populate the `engineering-paths.ts` file.
3.  **Develop the Graph Component (`EngineeringGraph.tsx`):**
    *   Use D3's force simulation (`d3-force`) to create a dynamic and aesthetically pleasing layout.
    *   Render nodes for Arcadia majors and partner universities.
    *   Render edges connecting Arcadia majors to the corresponding partner university programs.
    *   Implement smooth zoom and pan functionality using `d3-zoom`.
4.  **Implement Interactivity:**
    *   **Node Selection:** When a node is clicked, it will be highlighted, and the `InfoPanel` will display its details (description, requirements, etc.).
    *   **Node Expansion:** Clicking a university node will expand it to show the specific engineering programs offered. This will create a "zoomed-in" view of that university's pathways.
    *   **Hover Effects:** Nodes and edges will have hover effects to provide visual feedback.
5.  **Build UI Components:**
    *   **`Header.tsx`:** A sleek and modern header with the application title and a brief description.
    *   **`InfoPanel.tsx`:** A collapsible side panel to display information about the selected node. It will be designed for clarity and readability.
    *   **`Breadcrumbs.tsx`:** To show the current navigation path (e.g., "Home > Drexel University > Chemical Engineering"). This will be crucial for helping users understand their position in the graph.
    *   **`ZoomControls.tsx`:** On-screen buttons for intuitive zoom control, in addition to mouse wheel zooming.
6.  **Styling:**
    *   Apply a modern and professional design using Tailwind CSS.
    *   Use a consistent and accessible color palette.
    *   Ensure the typography is clean and legible.
7.  **Final Review and Refinement:**
    *   Thoroughly test the application for usability, performance, and responsiveness.
    *   Refine the visualization and interactions to ensure a seamless user experience.