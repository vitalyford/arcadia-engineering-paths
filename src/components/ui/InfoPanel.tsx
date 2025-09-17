
import React from 'react';
import { ArcadiaMajor, PartnerUniversity, PartnerProgram } from '@/data/engineering-paths';

interface InfoPanelProps {
  selectedNode: (ArcadiaMajor | PartnerUniversity | PartnerProgram) & { x?: number; y?: number, type?: string } | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedNode }) => {
  if (!selectedNode) {
    return (
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg h-full">
        <h2 className="text-2xl font-bold mb-4">Select a Node</h2>
        <p className="text-gray-400">Click on a major, university, or program to see more details here.</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (selectedNode.type) {
      case 'major':
        const major = selectedNode as ArcadiaMajor;
        return (
          <div>
            <h2 className="text-3xl font-bold mb-3 text-cyan-400">{major.name}</h2>
            <p className="text-gray-300 mb-4">{major.description}</p>
            
            {major.degreeTypes && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Degree Types</h3>
                <div className="flex space-x-2">
                  {major.degreeTypes.map(degree => (
                    <span key={degree} className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                      {degree}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {major.courses && major.courses.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Required Courses</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                  {major.courses.map((course, index) => (
                    <li key={index} className="text-sm">{course}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      case 'university':
        const university = selectedNode as PartnerUniversity;
        return (
          <div>
            <h2 className="text-3xl font-bold mb-3 text-teal-400">{university.name}</h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-200">University Requirements</h3>
              <p className="text-gray-300"><strong>GPA:</strong> {university.requirements.gpa}</p>
              <p className="text-gray-300"><strong>Notes:</strong> {university.requirements.notes}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-200">Programs</h3>
              <ul className="list-disc pl-5 text-gray-300">
                {university.programs.map(program => (
                  <li key={program.id}>{program.name}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'program':
        const program = selectedNode as PartnerProgram;
        return (
          <div>
            <h2 className="text-3xl font-bold mb-3 text-indigo-400">{program.name}</h2>
            <h3 className="text-xl font-semibold mb-2 text-gray-200">Program Requirements</h3>
            <ul className="list-disc pl-5 text-gray-300">
              {program.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return <p className="text-gray-400">No details available for this node type.</p>;
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg h-full overflow-y-auto">
      {renderContent()}
    </div>
  );
};

export default InfoPanel;
