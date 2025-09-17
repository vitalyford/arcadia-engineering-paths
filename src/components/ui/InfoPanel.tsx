import React from 'react';
import { ExtendedGraphNode } from '@/lib/graph-utils';

interface InfoPanelProps {
  selectedNode: ExtendedGraphNode | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedNode }) => {
  if (!selectedNode) {
    return (
      <div className="p-6 h-full flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-white">Select a Node</h2>
        <p className="text-gray-400">Click on a major, university, or program to see more details here.</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (selectedNode.type) {
      case 'major':
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-cyan-400">{selectedNode.name}</h2>
            {selectedNode.description && (
              <p className="text-gray-300">{selectedNode.description}</p>
            )}
            
            {selectedNode.degreeTypes && selectedNode.degreeTypes.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Degree Types</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.degreeTypes.map(degree => (
                    <span key={degree} className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
                      {degree}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {selectedNode.courses && selectedNode.courses.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Required Courses</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-1 max-h-64 overflow-y-auto">
                  {selectedNode.courses.map((course, index) => (
                    <li key={index} className="text-sm">{course}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      case 'university':
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-teal-400">{selectedNode.name}</h2>
            
            {selectedNode.requirements && typeof selectedNode.requirements === 'object' && 'gpa' in selectedNode.requirements && (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Requirements</h3>
                <div className="bg-gray-700 p-3 rounded">
                  <p className="text-gray-300"><strong>GPA:</strong> {selectedNode.requirements.gpa}</p>
                  {selectedNode.requirements.notes && (
                    <p className="text-gray-300 mt-2"><strong>Notes:</strong> {selectedNode.requirements.notes}</p>
                  )}
                </div>
              </div>
            )}
            
            {selectedNode.programs && selectedNode.programs.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Available Programs</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedNode.programs.map(program => (
                    <div key={program.id} className="bg-gray-700 p-3 rounded">
                      <h4 className="font-medium text-teal-300">{program.name}</h4>
                      {program.requirements && program.requirements.length > 0 && (
                        <ul className="list-disc pl-5 mt-2 text-sm text-gray-400">
                          {program.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 'program':
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-indigo-400">{selectedNode.name}</h2>
            
            {selectedNode.requirements && Array.isArray(selectedNode.requirements) && selectedNode.requirements.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Program Requirements</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-1 max-h-64 overflow-y-auto">
                  {selectedNode.requirements.map((req, index) => (
                    <li key={index} className="text-sm">{req}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedNode.arcadiaMajorIds && selectedNode.arcadiaMajorIds.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Related Arcadia Majors</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.arcadiaMajorIds.map(majorId => (
                    <span key={majorId} className="bg-indigo-600 text-white px-2 py-1 rounded text-sm">
                      {majorId}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold text-white">{selectedNode.name}</h2>
            <p className="text-gray-400 mt-2">Unknown node type</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default InfoPanel;