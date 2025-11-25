import React from 'react';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Arcadia Engineering Pathways Logo"
        >
            <defs>
                <linearGradient id="logoGradient" x1="10%" y1="0%" x2="90%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" /> {/* cyan-400 */}
                    <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
                </linearGradient>
            </defs>
            {/* Main Compass/A Shape Group */}
            <g>
                {/* Left Leg */}
                <path
                    d="M50 20 L25 85"
                    stroke="url(#logoGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Right Leg */}
                <path
                    d="M50 20 L75 85"
                    stroke="url(#logoGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Crossbar Arc - representing a measurement/connection */}
                <path
                    d="M36 62 Q50 55 64 62"
                    stroke="url(#logoGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                />
            </g>

            {/* Pivot Point (Top Node) */}
            <circle
                cx="50"
                cy="20"
                r="8"
                fill="#1f2937"
                stroke="url(#logoGradient)"
                strokeWidth="4"
            />

            {/* Terminal Nodes (Feet) */}
            <circle cx="25" cy="85" r="5" fill="#22d3ee" />
            <circle cx="75" cy="85" r="5" fill="#3b82f6" />

            {/* Center Detail - subtle circuit dot */}
            <circle cx="50" cy="58" r="3" fill="#22d3ee" opacity="0.8" />
        </svg>
    );
};

export default Logo;
