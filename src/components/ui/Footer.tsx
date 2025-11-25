import React from 'react';

export default function Footer() {
    return (
        <footer className="py-2 px-6 border-t border-gray-800 bg-gray-900/50">
            <div className="text-center">
                <a
                    href="https://github.com/vitalyford/arcadia-engineering-paths"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-gray-400 transition-colors duration-200"
                >
                    Designed and developed by Vitaly Ford
                </a>
            </div>
        </footer>
    );
}
