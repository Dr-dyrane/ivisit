import React, { useState, useRef } from 'react';
import { MobileFrame } from './MobileFrame';
import { WelcomeScreenReplica } from './WelcomeScreenReplica';
import { AmbulanceMapScreenReplica } from './AmbulanceMapScreenReplica';
import { BedBookingScreenReplica } from './BedBookingScreenReplica';
import { DesktopDashboardReplica } from './DesktopDashboardReplica';
import { FacilityDashboardReplica } from './FacilityDashboardReplica';
import { ProviderAppReplica } from './ProviderAppReplica';
import { DriverAppReplica } from './DriverAppReplica';
import { ArrowRight, SignalHigh } from 'lucide-react';

interface InteractiveFlowProps {
    mode: 'emergency' | 'bed' | 'facility' | 'logistics';
}

export function InteractiveFlow({ mode }: InteractiveFlowProps) {
    const [isActive, setIsActive] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isReserved, setIsReserved] = useState(false);
    const [step, setStep] = useState<'welcome' | 'map'>('welcome');
    const desktopRef = useRef<HTMLDivElement>(null);

    // Reset when mode changes
    React.useEffect(() => {
        setIsActive(false);
        setIsConnecting(false);
        setIsReserved(false);
        setStep('welcome');
    }, [mode]);

    const handleConnect = () => {
        setIsConnecting(true);

        // Wait for connection simulation (Loop 1)
        setTimeout(() => {
            setIsConnecting(false);
            setIsActive(true); // Loop 2 (Desktop starts sync)
            if (mode === 'emergency') {
                setStep('map');
            }

            // Loop 3: Staggered success for Bed Booking
            if (mode === 'bed') {
                setTimeout(() => {
                    setIsReserved(true);
                }, 3000); // Wait for desktop map transition
            }
        }, 1200);

        // Smooth scroll to desktop view on mobile
        if (window.innerWidth < 1280 && desktopRef.current) {
            setTimeout(() => {
                desktopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1800);
        }

        // Auto-reset
        setTimeout(() => {
            setIsActive(false);
            setIsReserved(false);
            setStep('welcome');
        }, 12000); // Extended reset time for longer flow
    };

    return (
        <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-24 w-full max-w-[1400px] mx-auto perspective-[2000px]">

            {/* Mobile Side Wrapper */}
            <div className="min-h-screen xl:min-h-0 flex items-center justify-center w-full py-12 xl:py-0 xl:contents">
                <div className={`relative group z-20 xl:translate-x-12 xl:rotate-y-[15deg] transition-all duration-700 hover:rotate-y-0 hover:scale-105 ${isConnecting ? 'scale-110 z-50' : ''}`}>
                    <MobileFrame>
                        {mode === 'emergency' ? (
                            step === 'welcome' ? (
                                <WelcomeScreenReplica onConnect={handleConnect} isActive={isActive || isConnecting} />
                            ) : (
                                <AmbulanceMapScreenReplica isActive={isActive} />
                            )
                        ) : mode === 'bed' ? (
                            <BedBookingScreenReplica onBook={handleConnect} isActive={isActive || isConnecting} isReserved={isReserved} />
                        ) : mode === 'facility' ? (
                            <ProviderAppReplica isActive={isActive} />
                        ) : (
                            <DriverAppReplica isActive={isActive} />
                        )}

                        {/* Facility/Logistics Mode Trigger */}
                        {(mode === 'facility' || mode === 'logistics') && !isActive && (
                            <div className="absolute inset-x-0 bottom-24 flex justify-center z-30 p-6">
                                <button
                                    onClick={handleConnect}
                                    disabled={isConnecting}
                                    className={`w-full py-[18px] text-white rounded-2xl font-bold text-[15px] tracking-wide shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden ${mode === 'facility' ? 'bg-[#10B981] shadow-emerald-900/20' : 'bg-[#B91C1C] shadow-red-900/20'
                                        }`}
                                >
                                    <span className={`transition-all duration-300 ${isConnecting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                                        {mode === 'facility' ? 'Simulate Triage' : 'Accept Dispatch'}
                                    </span>
                                    {isConnecting && (
                                        <div className="absolute inset-0 flex items-center justify-center gap-2 animate-in fade-in zoom-in duration-300">
                                            <span className="text-[15px] font-bold tracking-wide text-white/90">Connecting...</span>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        </div>
                                    )}
                                </button>
                            </div>
                        )}
                    </MobileFrame>
                </div>
            </div>

            {/* Connection Visual / Interaction Hint */}
            <div className={`flex xl:flex flex-col items-center justify-center gap-3 transition-all duration-700 my-12 xl:my-0 min-w-[140px] ${isConnecting ? 'opacity-20 blur-sm' : ''}`}>
                <div className={`h-8 xl:h-px w-px xl:w-24 transition-colors duration-500 ${isActive ? (mode === 'bed' || mode === 'logistics' ? 'bg-blue-500' : mode === 'facility' ? 'bg-green-500' : 'bg-destructive') : 'bg-gray-200 dark:bg-gray-800'}`} />

                <div className="relative flex items-center justify-center py-4">
                    {/* Active State (Synced) */}
                    <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75 absolute pointer-events-none'} ${mode === 'bed' || mode === 'logistics' ? 'text-blue-500' : mode === 'facility' ? 'text-green-500' : 'text-destructive'}`}>
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

                <div className={`h-8 xl:h-px w-px xl:w-24 transition-colors duration-500 ${isActive ? (mode === 'bed' || mode === 'logistics' ? 'bg-blue-500' : mode === 'facility' ? 'bg-green-500' : 'bg-destructive') : 'bg-gray-200 dark:bg-gray-800'}`} />
            </div>

            {/* Desktop Side Wrapper */}
            <div
                ref={desktopRef}
                className={`min-h-screen xl:min-h-0 flex items-center justify-center w-full py-12 xl:py-0 xl:contents transition-all duration-700 ${isConnecting ? 'opacity-30 blur-[2px] scale-[0.98] pointer-events-none' : ''}`}
            >
                <div className="relative w-full max-w-4xl transform xl:-rotate-y-[5deg] transition-all duration-700 hover:rotate-y-0 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[48px] p-1 bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-2xl">
                    <div className="relative aspect-[9/14] sm:aspect-[16/11] w-full rounded-[44px] overflow-hidden shadow-2xl bg-white dark:bg-[#0B0F1A]">
                        {mode === 'facility' ? (
                            <FacilityDashboardReplica isActive={isActive} />
                        ) : (
                            <DesktopDashboardReplica isActive={isActive} mode={mode as 'emergency' | 'bed'} />
                        )}

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
