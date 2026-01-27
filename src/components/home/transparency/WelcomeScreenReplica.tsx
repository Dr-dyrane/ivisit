import React, { useState, useEffect } from 'react';
import { Ambulance } from 'lucide-react';

interface WelcomeScreenReplicaProps {
    onConnect: () => void;
    isActive: boolean;
}

export function WelcomeScreenReplica({ onConnect, isActive }: WelcomeScreenReplicaProps) {
    const [swiped, setSwiped] = useState(false);

    // Auto-reset when parent flow finishes
    useEffect(() => {
        if (!isActive) {
            setSwiped(false);
        }
    }, [isActive]);

    const handleSlide = () => {
        if (!swiped) {
            setSwiped(true);
            // Wait for visual slide completion before triggering connect
            setTimeout(() => {
                onConnect();
            }, 600);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-background via-secondary/10 to-background dark:from-[#0B0F1A] dark:via-[#111827] dark:to-[#0B0F1A] px-6 pt-16 pb-8 justify-between relative overflow-hidden transition-colors duration-500">
            {/* Status Bar Spacer */}
            <div className="h-6 w-full" />

            {/* Header */}
            <div className="flex flex-col items-center mt-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-red-600 blur-xl opacity-20 rounded-full" />
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-16 h-16 object-contain relative z-10 drop-shadow-2xl"
                    />
                </div>
                <h1 className="text-3xl mt-4 font-black tracking-tighter text-foreground leading-none">
                    iVisit<span className="text-[#DC2626]">.</span>
                </h1>
            </div>

            {/* Hero Illustration Placeholder */}
            <div className="w-full h-48 flex items-center justify-center my-2 relative">
                {/* Glow for 3D effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent rounded-full blur-3xl transform scale-75" />

                {/* Image Container */}
                <div className="relative w-full h-full flex items-center justify-center z-10 transition-transform duration-700 hover:scale-105">
                    <img
                        src="/hero-illustration.png"
                        className="w-[120%] h-[120%] object-contain drop-shadow-2xl"
                        alt="Emergency Response"
                        onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                </div>
            </div>

            {/* Value Prop */}
            <div className="w-full px-4 text-center space-y-4 pb-6">
                <h2 className="text-[28px] leading-[32px] font-black tracking-tight text-foreground">
                    Skip the wait. <span className="text-[#DC2626]">Get<br />care now.</span>
                </h2>
                <p className="text-[15px] text-muted-foreground font-medium leading-relaxed max-w-[260px] mx-auto">
                    Book a bed. Get an ambulance. See a doctor. <span className="text-foreground font-bold">Right when you need it.</span>
                </p>
            </div>

            {/* Slide Button */}
            <div className="w-full mt-auto mb-6">
                <div
                    className="relative h-[56px] w-full bg-[#B91C1C] rounded-2xl overflow-hidden cursor-pointer group shadow-lg shadow-red-900/20 active:scale-[0.98] transition-all duration-200"
                    onClick={handleSlide}
                >
                    {/* Base Text */}
                    <div className={`absolute inset-0 flex items-center justify-center gap-2 z-10 transition-all duration-300 ${swiped ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                        <span className="text-[15px] font-bold tracking-wide text-white">Find Care Now</span>
                        <Ambulance className="h-5 w-5 text-white" />
                    </div>

                    {/* Connecting State Overlay */}
                    <div
                        className={`absolute inset-0 bg-[#991B1B] flex items-center justify-center gap-2 z-20 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${swiped ? 'translate-y-0' : 'translate-y-full'}`}
                    >
                        <span className="text-[15px] font-bold tracking-wide text-white/90">Connecting...</span>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                </div>
            </div>

            {/* Login */}
            <div className="text-center mb-2">
                <p className="text-muted-foreground text-xs font-medium">
                    Already have an account? <span className="font-bold text-[#DC2626] cursor-pointer hover:underline ml-1">Login</span>
                </p>
            </div>
        </div>
    );
}
