import React, { useState } from 'react';
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
        // Auto-reset
        setTimeout(() => {
            setIsActive(false);
            setStep('welcome');
        }, 8000);
    };

    return (
        <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-24 w-full max-w-[1400px] mx-auto perspective-[2000px]">

            {/* Mobile Side */}
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

                {/* Interaction Hint */}
                {!isActive && (
                    <div className="absolute -right-32 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-4 text-gray-400 animate-pulse pointer-events-none">
                        <span>Try it</span>
                        <ArrowRight className="w-6 h-6" />
                    </div>
                )}
            </div>

            {/* Connection Visual (Desktop Only) */}
            <div className={`hidden xl:flex flex-col items-center gap-2 transition-opacity duration-500 ${isActive ? (mode === 'bed' ? 'opacity-100 text-blue-500' : 'opacity-100 text-green-500') : 'opacity-20 text-gray-300'
                }`}>
                <div className="h-px w-24 bg-current" />
                <SignalHigh className={`w-8 h-8 ${isActive ? 'animate-ping' : ''}`} />
                <span className="text-xs font-mono uppercase tracking-widest">{isActive ? 'SYNCED 12ms' : 'OFFLINE'}</span>
                <div className="h-px w-24 bg-current" />
            </div>

            {/* Desktop Side */}
            <div className="relative w-full max-w-3xl transform xl:-rotate-y-[5deg] transition-all duration-700 hover:rotate-y-0 shadow-2xl rounded-3xl">
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-900/5 bg-gray-50 dark:bg-gray-900">
                    <DesktopDashboardReplica isActive={isActive} mode={mode} />

                    {/* Reflection Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                </div>

                {/* Base Stand Logic (Optional styling touch) */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-gray-300 dark:bg-gray-800 rounded-b-xl blur-sm opacity-50" />
            </div>

        </div>
    );
}
