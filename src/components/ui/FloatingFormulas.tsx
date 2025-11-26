'use client';

import React from 'react';

export default function BlueprintBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    {/* Fine grid pattern - blueprint style */}
                    <pattern id="blueprint-grid-small" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path
                            d="M 20 0 L 0 0 0 20"
                            fill="none"
                            stroke="rgba(170, 32, 44, 0.05)"
                            strokeWidth="0.5"
                        />
                    </pattern>

                    {/* Major grid pattern */}
                    <pattern id="blueprint-grid-large" width="100" height="100" patternUnits="userSpaceOnUse">
                        <rect width="100" height="100" fill="url(#blueprint-grid-small)" />
                        <path
                            d="M 100 0 L 0 0 0 100"
                            fill="none"
                            stroke="rgba(170, 32, 44, 0.08)"
                            strokeWidth="1"
                        />
                    </pattern>
                </defs>

                {/* Apply blueprint grid */}
                <rect width="100%" height="100%" fill="url(#blueprint-grid-large)" />

                {/* Corner measurement marks */}
                <g stroke="rgba(170, 32, 44, 0.12)" strokeWidth="1.5" fill="none">
                    {/* Top left */}
                    <line x1="0" y1="15" x2="0" y2="0" />
                    <line x1="0" y1="0" x2="15" y2="0" />

                    {/* Top right */}
                    <line x1="100%" y1="15" x2="100%" y2="0" />
                    <line x1="100%" y1="0" x2="calc(100% - 15px)" y2="0" />

                    {/* Bottom left */}
                    <line x1="0" y1="calc(100% - 15px)" x2="0" y2="100%" />
                    <line x1="0" y1="100%" x2="15" y2="100%" />

                    {/* Bottom right */}
                    <line x1="100%" y1="calc(100% - 15px)" x2="100%" y2="100%" />
                    <line x1="100%" y1="100%" x2="calc(100% - 15px)" y2="100%" />
                </g>
            </svg>
        </div>
    );
}
