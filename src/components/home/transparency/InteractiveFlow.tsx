import React, { useState, useRef } from 'react';
import { MobileFrame } from './MobileFrame';
import { WelcomeScreenReplica } from './WelcomeScreenReplica';
import { AmbulanceMapScreenReplica } from './AmbulanceMapScreenReplica';
import { BedBookingScreenReplica } from './BedBookingScreenReplica';
import { DesktopDashboardReplica } from './DesktopDashboardReplica';
import { ArrowRight, SignalHigh } from 'lucide-react';

interface InteractiveFlowProps {
    mode: 'emergency' | 'bed';
}

export function InteractiveFlow({ mode }: InteractiveFlowProps) {
    const [isActive, setIsActive] = useState(false);
    const [step, setStep] = useState<'welcome' | 'map'>('welcome');
    const desktopRef = useRef<HTMLDivElement>(null);

    // Reset when mode changes
    React.useEffect(() => {
        setIsActive(false);
        setStep('welcome');
    }, [mode]);

    const handleConnect = () => {
        setIsActive(true);
        if (mode === 'emergency') {
            setTimeout(() => setStep('map'), 800); // Transition to map after connect
        }

        // Smooth scroll to desktop view on mobile
        if (window.innerWidth < 1280 && desktopRef.current) {
            setTimeout(() => {
                desktopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }

        // Auto-reset
        setTimeout(() => {
            setIsActive(false);
            setStep('welcome');
        }, 8000);
    };

    return (
        <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-24 w-full max-w-[1400px] mx-auto perspective-[2000px]">

            {/* Mobile Side Wrapper */}
            <div className="min-h-screen xl:min-h-0 flex items-center justify-center w-full py-12 xl:py-0 xl:contents">
                <div className="relative group z-20 xl:translate-x-12 xl:rotate-y-[15deg] transition-all duration-700 hover:rotate-y-0 hover:scale-105">
                    <MobileFrame>
                        {mode === 'emergency' ? (
                            step === 'welcome' ? (
                                <WelcomeScreenReplica onConnect={handleConnect} isActive={isActive} />
                            ) : (
                                <AmbulanceMapScreenReplica isActive={isActive} />
                            )
                        ) : (
                            <BedBookingScreenReplica onBook={handleConnect} isActive={isActive} />
                        )}
                    </MobileFrame>
                </div>
            </div>

            {/* Connection Visual / Interaction Hint */}
            <div className="flex xl:flex flex-col items-center justify-center gap-3 transition-all duration-500 my-12 xl:my-0 min-w-[140px]">
                <div className={`h-8 xl:h-px w-px xl:w-24 transition-colors duration-500 ${isActive ? (mode === 'bed' ? 'bg-blue-500' : 'bg-green-500') : 'bg-gray-200 dark:bg-gray-800'}`} />

                <div className="relative flex items-center justify-center py-4">
                    {/* Active State (Synced) */}
                    <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75 absolute pointer-events-none'} ${mode === 'bed' ? 'text-blue-500' : 'text-green-500'}`}>
                        <SignalHigh className="w-6 h-6 xl:w-8 xl:h-8 animate-ping" />
                        <span className="text-[10px] xl:text-xs font-mono uppercase tracking-widest whitespace-nowrap">SYNCED 12ms</span>
                    </div>

                    {/* Inactive State (Try It) */}
                    <div className={`flex flex-col xl:flex-row items-center gap-4 transition-all duration-500 ${!isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75 absolute pointer-events-none'}`}>
                        <span className="text-sm xl:text-base text-gray-400 font-medium">Try it</span>
                        <div className="rotate-90 xl:rotate-0 bg-primary/10 rounded-full p-2.5 text-primary/60">
                            <ArrowRight className="w-5 h-5 xl:w-6 xl:h-6" />
                        </div>
                    </div>
                </div>

                <div className={`h-8 xl:h-px w-px xl:w-24 transition-colors duration-500 ${isActive ? (mode === 'bed' ? 'bg-blue-500' : 'bg-green-500') : 'bg-gray-200 dark:bg-gray-800'}`} />
            </div>

            {/* Desktop Side Wrapper */}
            <div
                ref={desktopRef}
                className="min-h-screen xl:min-h-0 flex items-center justify-center w-full py-12 xl:py-0 xl:contents"
            >
                <div className="relative w-full max-w-4xl transform xl:-rotate-y-[5deg] transition-all duration-700 hover:rotate-y-0 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[48px] p-1 bg-white/5 border border-white/10 backdrop-blur-2xl">
                    <div className="relative aspect-[9/14] sm:aspect-[16/11] xl:aspect-[16/10] w-full rounded-[44px] overflow-hidden shadow-2xl bg-[#0B0F1A]">
                        <DesktopDashboardReplica isActive={isActive} mode={mode} />

                        {/* Glass Reflection Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.05] pointer-events-none z-40" />
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none z-40" />
                    </div>

                    {/* Premium Base Stand */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-xl shadow-2xl scale-x-110" />
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-b from-gray-800/20 to-transparent blur-xl pointer-events-none" />
                </div>
            </div>

        </div>
    );
}
