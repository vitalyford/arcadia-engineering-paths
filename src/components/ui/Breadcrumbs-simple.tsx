import React from 'react';
import { GraphViewState, ExtendedGraphNode } from '@/lib/graph-utils';

interface BreadcrumbsProps {
  viewState: GraphViewState;
  allNodes: Map<string, ExtendedGraphNode>;
  onNavigateHome: () => void;
  onSelectUniversity: (universityId: string) => void;
  onSelectMajor: (majorId: string, universityId?: string) => void;
  onSwitchUniversity: (newUniversityId: string, currentMajorId?: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  viewState,
  allNodes,
  onNavigateHome,
  onSelectUniversity,
  onSelectMajor,
  onSwitchUniversity
}) => {
  return (
    <nav className="px-6 py-3 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center space-x-2 text-sm">
        <button
          onClick={onNavigateHome}
          className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors"
        >
          Home
        </button>
        
        {viewState.selectedUniversityId && (
          <>
            <span className="text-gray-500">/</span>
            <span className="text-teal-400">
              {allNodes.get(viewState.selectedUniversityId)?.name || 'University'}
            </span>
          </>
        )}
        
        {viewState.selectedMajorId && (
          <>
            <span className="text-gray-500">/</span>
            <span className="text-cyan-400">
              {allNodes.get(viewState.selectedMajorId)?.name || 'Major'}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Breadcrumbs;