
import React from 'react';

export interface EdgeProps {
  source: {
    x: number;
    y: number;
  };
  target: {
    x: number;
    y: number;
  };
}

const Edge: React.FC<EdgeProps> = ({ source, target }) => {
  return (
    <line
      x1={source.x}
      y1={source.y}
      x2={target.x}
      y2={target.y}
      stroke="#4b5563"
      strokeWidth="2"
      strokeOpacity="0.6"
      className="transition-all duration-200 hover:stroke-cyan-400 hover:stroke-opacity-80"
    />
  );
};

export default Edge;
