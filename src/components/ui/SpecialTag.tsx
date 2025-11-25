'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface SpecialTagProps {
  type: 'guaranteed-admission' | 'program-type' | 'coop';
  text: string;
  tooltip?: string;
  icon?: string;
  className?: string;
}

const SpecialTag: React.FC<SpecialTagProps> = ({ type, text, tooltip, icon, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
    placement: 'above' | 'below';
  }>({
    top: 0,
    left: 0,
    placement: 'above'
  });
  const tagRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered && tooltip && mousePosition.x > 0 && mousePosition.y > 0) {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const tooltipHeight = 120;
      const tooltipWidth = 288;
      const offset = 15; // Distance from mouse cursor
      const margin = 10; // Margin from viewport edges

      // Calculate initial position relative to mouse
      let top = mousePosition.y + offset;
      let left = mousePosition.x - (tooltipWidth / 2);
      let placement: 'above' | 'below' = 'below';

      // Check if tooltip would go below viewport
      if (top + tooltipHeight > viewportHeight - margin) {
        // Show above mouse instead
        top = mousePosition.y - tooltipHeight - offset;
        placement = 'above';
      }

      // Ensure tooltip stays within horizontal viewport bounds
      if (left < margin) {
        left = margin;
      } else if (left + tooltipWidth > viewportWidth - margin) {
        left = viewportWidth - tooltipWidth - margin;
      }

      // Ensure tooltip doesn't go above viewport
      if (top < margin) {
        top = margin;
        placement = 'below';
      }

      setTooltipPosition({ top, left, placement });
    }
  }, [isHovered, tooltip, mousePosition]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const getTagStyles = () => {
    switch (type) {
      case 'guaranteed-admission':
        return 'bg-green-600 text-white border-green-500';
      case 'program-type':
        return 'bg-blue-600 text-white border-blue-500';
      case 'coop':
        return 'bg-orange-600 text-white border-orange-500';
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

  return (
    <div ref={tagRef} className="relative inline-block">
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border cursor-help ${getTagStyles()} ${className}`}
        onMouseEnter={(e) => {
          if (tooltip) {
            // Clear any existing timeout
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsHovered(true);
            // Small delay before showing tooltip to prevent flicker
            hoverTimeoutRef.current = setTimeout(() => {
              setShowTooltip(true);
            }, 100);
          }
        }}
        onMouseMove={(e) => {
          if (tooltip && isHovered) {
            setMousePosition({ x: e.clientX, y: e.clientY });
          }
        }}
        onMouseLeave={() => {
          if (tooltip) {
            // Clear any existing timeout
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
            setIsHovered(false);
            setShowTooltip(false);
          }
        }}
      >
        {getIcon() && <span className="text-xs">{getIcon()}</span>}
        {text}
      </span>

      {tooltip && showTooltip && typeof window !== 'undefined' && createPortal(
        <div
          className="fixed px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl border border-gray-700 z-[9999] w-72 pointer-events-none"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            maxWidth: 'min(18rem, 90vw)',
            minWidth: '12rem'
          }}
        >
          <div className="text-left whitespace-normal leading-relaxed">{tooltip}</div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default SpecialTag;