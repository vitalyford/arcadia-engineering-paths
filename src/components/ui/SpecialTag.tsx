'use client';

import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface SpecialTagProps {
  type: 'guaranteed-admission' | 'program-type' | 'coop' | 'major';
  text: string;
  tooltip?: string;
  icon?: string;
  className?: string;
}

const SpecialTag: React.FC<SpecialTagProps> = ({
  type,
  text,
  tooltip,
  icon,
  className = '',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getTagStyles = () => {
    switch (type) {
      case 'guaranteed-admission':
        return 'bg-green-600 text-white border-green-500';
      case 'program-type':
        return 'bg-primary text-white border-primary';
      case 'coop':
        return 'bg-orange-600 text-white border-orange-500';
      case 'major':
        return 'bg-primary text-white border-primary';
      default:
        return 'bg-gray-600 text-white border-gray-500';
    }
  };

  const getIcon = () => {
    if (icon) return icon;

    switch (type) {
      case 'guaranteed-admission':
        return '✓';
      case 'program-type':
        return '🎓';
      case 'coop':
        return '💼';
      default:
        return '';
    }
  };

  const calculateTooltipPosition = () => {
    if (!tooltip || !showTooltip) {
      return { top: 0, left: 0 };
    }

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const tooltipHeight = 120;
    const tooltipWidth = 288;
    const offset = 15;
    const margin = 10;

    let top = mousePosition.y + offset;
    let left = mousePosition.x - tooltipWidth / 2;

    // Prevent bottom overflow
    if (top + tooltipHeight > viewportHeight - margin) {
      top = mousePosition.y - tooltipHeight - offset;
    }

    // Prevent horizontal overflow
    if (left < margin) {
      left = margin;
    } else if (left + tooltipWidth > viewportWidth - margin) {
      left = viewportWidth - tooltipWidth - margin;
    }

    // Prevent top overflow
    if (top < margin) {
      top = margin;
    }

    return { top, left };
  };

  const tooltipPosition =
    typeof window !== 'undefined' ? calculateTooltipPosition() : { top: 0, left: 0 };

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!tooltip) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    setMousePosition({ x: e.clientX, y: e.clientY });

    hoverTimeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 100);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!tooltip || !showTooltip) return;
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    if (!tooltip) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    setShowTooltip(false);
  };

  return (
    <div className="relative inline-block">
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border cursor-help ${getTagStyles()} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {getIcon() && <span className="text-xs">{getIcon()}</span>}
        {text}
      </span>

      {tooltip &&
        showTooltip &&
        typeof window !== 'undefined' &&
        createPortal(
          <div
            className="fixed px-3 py-2 bg-white text-gray-800 text-sm rounded-lg shadow-xl border-2 border-gray-200 z-50 w-72 pointer-events-none"
            style={{
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
              maxWidth: 'min(18rem, 90vw)',
              minWidth: '12rem',
            }}
          >
            <div className="text-left whitespace-normal leading-relaxed">
              {tooltip}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default SpecialTag;