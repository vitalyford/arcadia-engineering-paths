
import React from 'react';
import * as d3 from 'd3';

export interface NodeProps {
  id: string;
  name: string;
  x: number;
  y: number;
  type: 'major' | 'university' | 'program';
  onClick: () => void;
  selected: boolean;
}

const Node: React.FC<NodeProps> = ({ name, x, y, type, onClick, selected }) => {
  const ref = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      const g = d3.select(ref.current);
      
      g.call(
        d3.drag<SVGGElement, unknown>()
          .on('start', function(event) {
            d3.select(this).raise();
            event.sourceEvent.stopPropagation();
          })
          .on('drag', function(event) {
            // Update the transform directly
            d3.select(this).attr('transform', `translate(${event.x}, ${event.y})`);
          })
          .on('end', function() {
            // Optional: you can emit events here to update the simulation if needed
          })
      );
    }
  }, []);

  const getNodeColor = () => {
    switch (type) {
      case 'major':
        return 'url(#majorGradient)';
      case 'university':
        return 'url(#universityGradient)';
      case 'program':
        return 'url(#programGradient)';
      default:
        return '#6b7280';
    }
  };

  const getNodeSize = () => {
    switch (type) {
      case 'major':
        return 30;
      case 'university':
        return 35;
      case 'program':
        return 25;
      default:
        return 25;
    }
  };

  const getStrokeWidth = () => {
    return selected ? 4 : 2;
  };

  const getStrokeColor = () => {
    return selected ? '#fbbf24' : '#374151';
  };

  return (
    <g ref={ref} transform={`translate(${x}, ${y})`} className="cursor-pointer group" onClick={onClick}>
      <circle 
        cx="0" 
        cy="0" 
        r={getNodeSize()} 
        fill={getNodeColor()}
        stroke={getStrokeColor()}
        strokeWidth={getStrokeWidth()}
        filter="url(#shadow)"
        className="transition-all duration-200 group-hover:stroke-white group-hover:stroke-4" 
      />
      <text 
        x="0" 
        y={getNodeSize() + 25} 
        textAnchor="middle" 
        className="fill-white font-sans text-sm pointer-events-none select-none"
        fontSize="12"
        fontWeight="600"
      >
        {name.length > 12 ? name.substring(0, 12) + '...' : name}
      </text>
      {/* Add a subtle glow effect when selected */}
      {selected && (
        <circle 
          cx="0" 
          cy="0" 
          r={getNodeSize() + 8} 
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
          opacity="0.3"
          className="animate-pulse"
        />
      )}
    </g>
  );
};

export default Node;
