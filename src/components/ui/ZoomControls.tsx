
import React from 'react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ onZoomIn, onZoomOut }) => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col">
      <button
        className="bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold shadow-md mb-2 hover:bg-gray-700 focus:outline-none"
        onClick={onZoomIn}
      >
        +
      </button>
      <button
        className="bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold shadow-md hover:bg-gray-700 focus:outline-none"
        onClick={onZoomOut}
      >
        -
      </button>
    </div>
  );
};

export default ZoomControls;
