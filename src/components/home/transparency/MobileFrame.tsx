import React from 'react';

interface MobileFrameProps {
    children: React.ReactNode;
    className?: string;
}

export function MobileFrame({ children, className = '' }: MobileFrameProps) {
    return (
        <div className={`relative mx-auto border-gray-300 dark:border-gray-900 bg-gray-300 dark:bg-gray-900 border-[12px] rounded-[55px] h-[640px] w-[312px] shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-500 ${className}`}>
            {/* Dynamic Island */}
            <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-20 flex items-center justify-center pointer-events-none">
                {/* Camera Lens Reflection */}
                <div className="absolute right-[20%] w-2 h-2 rounded-full bg-[#1c1c1e] shadow-inner" />
            </div>

            {/* Buttons */}
            <div className="h-[32px] w-[3px] bg-gray-400 dark:bg-gray-800 absolute -left-[15px] top-[100px] rounded-l-lg shadow-lg transition-colors duration-500"></div>
            <div className="h-[46px] w-[3px] bg-gray-400 dark:bg-gray-800 absolute -left-[15px] top-[150px] rounded-l-lg shadow-lg transition-colors duration-500"></div>
            <div className="h-[46px] w-[3px] bg-gray-400 dark:bg-gray-800 absolute -left-[15px] top-[210px] rounded-l-lg shadow-lg transition-colors duration-500"></div>
            <div className="h-[64px] w-[3px] bg-gray-400 dark:bg-gray-800 absolute -right-[15px] top-[170px] rounded-r-lg shadow-lg transition-colors duration-500"></div>

            {/* Screen Content */}
            <div className="rounded-[44px] overflow-hidden w-full h-full bg-white dark:bg-black relative z-10">
                {children}
            </div>
        </div>
    );
}
