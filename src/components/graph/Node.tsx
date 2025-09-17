
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
  onDrag?: (nodeId: string, newX: number, newY: number) => void;
  onDragEnd?: (nodeId: string) => void;
}

const Node: React.FC<NodeProps> = ({ id, name, x, y, type, onClick, selected, onDrag, onDragEnd }) => {
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
            // Notify parent component of new position
            onDrag?.(id, event.x, event.y);
          })
          .on('end', function() {
            // Notify parent that drag ended
            onDragEnd?.(id);
          })
      );
    }
  }, [id, onDrag, onDragEnd]);

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

  // Function to split text into two lines for better readability
  const getTextLines = (text: string): [string, string] => {
    if (text.length <= 14) {
      return [text, ''];
    }
    
    // Try to split at a space near the middle
    const words = text.split(' ');
    if (words.length === 1) {
      // Single word - split at character limit
      const mid = Math.ceil(text.length / 2);
      return [text.substring(0, mid), text.substring(mid)];
    }
    
    // Multiple words - find best split point
    let firstLine = '';
    let secondLine = '';
    let totalLength = 0;
    
    for (let i = 0; i < words.length; i++) {
      const wordWithSpace = words[i] + (i < words.length - 1 ? ' ' : '');
      if (totalLength + wordWithSpace.length <= 14 || firstLine === '') {
        firstLine += wordWithSpace;
        totalLength += wordWithSpace.length;
      } else {
        secondLine = words.slice(i).join(' ');
        break;
      }
    }
    
    return [firstLine.trim(), secondLine];
  };

  const [firstLine, secondLine] = getTextLines(name);

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
      <g className="node-text">
        <text 
          x="0" 
          y={getNodeSize() + (secondLine ? 20 : 25)} 
          textAnchor="middle" 
          className="fill-white font-sans text-sm pointer-events-none select-none"
          fontSize="12"
          fontWeight="600"
        >
          {firstLine}
        </text>
        {secondLine && (
          <text 
            x="0" 
            y={getNodeSize() + 35} 
            textAnchor="middle" 
            className="fill-white font-sans text-sm pointer-events-none select-none"
            fontSize="12"
            fontWeight="600"
          >
            {secondLine}
          </text>
        )}
      </g>
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
