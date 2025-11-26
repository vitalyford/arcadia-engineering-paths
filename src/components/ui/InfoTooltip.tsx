'use client';

import React, { useState } from 'react';

interface InfoTooltipProps {
  content: string;
  className?: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ content, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="inline-flex items-center justify-center w-4 h-4 bg-primary hover:bg-primary-hover text-white rounded-full text-xs font-bold transition-colors shadow-sm"
        aria-label="More information"
      >
        ?
      </button>

      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white text-gray-800 text-xs rounded-lg shadow-xl border-2 border-gray-200 max-w-xs z-50">
          <div className="whitespace-normal text-center">{content}</div>
          {/* Arrow pointing down */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;