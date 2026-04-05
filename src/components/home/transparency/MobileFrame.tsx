import React from 'react';

interface MobileFrameProps {
    children: React.ReactNode;
    className?: string;
}

export function MobileFrame({ children, className = '' }: MobileFrameProps) {
    return (
        <div className={`relative mx-auto h-[708px] w-[336px] rounded-[58px] border-[11px] border-gray-300 bg-gray-300 shadow-2xl ring-1 ring-black/5 transition-colors duration-500 dark:border-gray-900 dark:bg-gray-900 dark:ring-white/10 ${className}`}>
            {/* Dynamic Island */}
            <div className="pointer-events-none absolute left-1/2 top-[12px] z-20 flex h-[28px] w-[98px] -translate-x-1/2 items-center justify-center rounded-full bg-black">
                {/* Camera Lens Reflection */}
                <div className="absolute right-[20%] w-2 h-2 rounded-full bg-[#1c1c1e] shadow-inner" />
            </div>

            {/* Buttons */}
            <div className="absolute -left-[14px] top-[118px] h-[32px] w-[3px] rounded-l-lg bg-gray-400 shadow-lg transition-colors duration-500 dark:bg-gray-800"></div>
            <div className="absolute -left-[14px] top-[168px] h-[46px] w-[3px] rounded-l-lg bg-gray-400 shadow-lg transition-colors duration-500 dark:bg-gray-800"></div>
            <div className="absolute -left-[14px] top-[228px] h-[46px] w-[3px] rounded-l-lg bg-gray-400 shadow-lg transition-colors duration-500 dark:bg-gray-800"></div>
            <div className="absolute -right-[14px] top-[190px] h-[68px] w-[3px] rounded-r-lg bg-gray-400 shadow-lg transition-colors duration-500 dark:bg-gray-800"></div>

            {/* Screen Content */}
            <div className="relative z-10 h-full w-full overflow-hidden rounded-[46px] bg-white dark:bg-black">
                {children}
            </div>
        </div>
    );
}
