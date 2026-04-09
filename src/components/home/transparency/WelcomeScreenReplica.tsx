import React, { useEffect, useState } from 'react';
import { SunMedium } from 'lucide-react';

interface WelcomeScreenReplicaProps {
    onConnect: () => void;
    isActive: boolean;
}

const PRIMARY_CTA_LABEL = 'Continue';

export function WelcomeScreenReplica({ onConnect, isActive }: WelcomeScreenReplicaProps) {
    const [isOpening, setIsOpening] = useState(false);

    useEffect(() => {
        if (!isActive) {
            setIsOpening(false);
        }
    }, [isActive]);

    const handleOpen = () => {
        if (isOpening) return;
        setIsOpening(true);
        setTimeout(() => {
            onConnect();
        }, 500);
    };

    return (
        <div className="relative flex h-full flex-col overflow-hidden bg-[linear-gradient(180deg,#fffcfb_0%,#fbf7f6_48%,#f6f2f1_100%)] px-7 pb-8 pt-7 text-slate-900 transition-colors duration-500 dark:bg-[linear-gradient(180deg,#0B0F1A_0%,#101827_50%,#0B0F1A_100%)] dark:text-white">
            <div className="pointer-events-none absolute -left-14 -top-10 h-40 w-40 rounded-full bg-primary/[0.08] blur-3xl dark:bg-primary/[0.12]" />
            <div className="pointer-events-none absolute -right-[4.5rem] bottom-10 h-52 w-52 rounded-full bg-slate-200/60 blur-3xl dark:bg-[#132038]/60" />

            <div className="relative flex flex-1 flex-col">
                <div className="relative flex items-start justify-center">
                    <div
                        aria-hidden="true"
                        className="absolute right-0 top-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 bg-white/70 text-primary shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-md transition-colors dark:bg-white/5 dark:text-white dark:shadow-[0_12px_30px_rgba(0,0,0,0.22)]"
                    >
                        <SunMedium className="h-4 w-4" />
                    </div>

                    <div className="flex flex-col items-center pt-4 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-red-600/12 blur-2xl dark:bg-red-600/20" />
                            <img
                                src="/logo.png"
                                alt="iVisit"
                                className="relative z-10 h-9 w-9 object-contain"
                            />
                        </div>
                        <h1 className="mt-2 text-[26px] font-black tracking-[-0.06em] text-foreground">
                            iVisit<span className="text-[#991B1B]">.</span>
                        </h1>
                    </div>
                </div>

                <div className="mx-auto mt-2 flex w-full max-w-[214px] justify-center">
                    <img
                        src="/emergency-welcome.png"
                        alt="Emergency response preview"
                        className="h-auto w-full object-contain"
                    />
                </div>

                <div className="mx-auto mt-5 w-full max-w-[282px] text-center">
                    <h2 className="text-[33px] font-black leading-[0.94] tracking-[-0.05em] text-foreground">
                        Get help now
                    </h2>
                    <p className="mt-3 text-[15px] font-semibold leading-6 text-muted-foreground">
                        Fast help nearby.
                    </p>

                    <div className="mt-3 inline-flex items-center rounded-full bg-white/78 px-4 py-2 text-[13px] font-bold text-slate-600 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-md dark:border dark:border-white/8 dark:bg-white/[0.05] dark:text-slate-100 dark:shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                        Available near you
                    </div>
                </div>

                <div className="mx-auto mt-auto flex w-full max-w-[298px] flex-col gap-2.5 pt-6">
                    <button
                        onClick={handleOpen}
                        className="relative flex h-[52px] w-full items-center justify-center overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#99110F_0%,#B81614_100%)] px-5 text-[15px] font-extrabold text-white shadow-[0_16px_36px_rgba(127,29,29,0.18)] transition-transform duration-200 active:scale-[0.985]"
                    >
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-px right-px top-px h-[42%] rounded-[25px] bg-white opacity-[0.04]"
                        />
                        <span className={`transition-opacity duration-200 ${isOpening ? 'opacity-70' : 'opacity-100'}`}>
                            {PRIMARY_CTA_LABEL}
                        </span>
                    </button>
                </div>

                <p className="mt-3 text-center text-[13px] font-semibold text-muted-foreground">
                    Sign in
                </p>
            </div>
        </div>
    );
}
