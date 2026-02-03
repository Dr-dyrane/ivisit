import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2, Command, ShieldCheck, Zap, ArrowRight, Activity, Users } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';

export default function ProviderShowcase() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

    const features = [
        {
            icon: <Command className="w-6 h-6" />,
            title: "Command OS",
            description: "Unified clinical operations and dispatch."
        },
        {
            icon: <Activity className="w-6 h-6" />,
            title: "Real-time Triage",
            description: "Instant pre-arrival medical intelligence."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Zero Latency",
            description: "Synchronized dispatch and facility comms."
        },
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Verified Identity",
            description: "Credential-based secure access."
        }
    ];

    return (
        <Section id="providers" ref={sectionRef} className="relative py-24 sm:py-32 lg:py-48 overflow-hidden bg-transparent">
            {/* Background Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] pointer-events-none opacity-50" />

            <Container>
                <motion.div style={{ opacity, scale }} className="relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-24 md:mb-32">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                            <Building2 className="w-3.5 h-3.5" />
                            Clinical Infrastructure
                        </div>

                        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.08em] text-foreground mb-10 leading-[0.8]">
                            The Command OS for <br className="hidden sm:block" />
                            <span className="text-primary">Modern Facilities.</span>
                        </h2>

                        <p className="text-xl sm:text-2xl font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            Transform your facility into a high-performance node in the iVisit network.
                            Manage capacity with tactical precision.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 max-w-6xl mx-auto">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-12 rounded-[32px] bg-background/20 backdrop-blur-3xl group transition-all duration-500 hover:scale-[1.02] flex flex-col justify-between min-h-[300px]"
                            >
                                <div className="mb-8 inline-flex p-6 rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 w-fit">
                                    {feature.icon}
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-bold text-foreground mb-6 tracking-tight">{feature.title}</h3>
                                    <p className="text-lg font-light text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-center gap-10">
                        <Button
                            variant="accent"
                            size="lg"
                            onClick={() => window.open('https://console.ivisit.ng/onboarding', '_blank')}
                            showOverlay={true}
                            className="w-full sm:w-auto px-12 py-8 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20"
                        >
                            <div className="flex items-center gap-3">
                                <span>Onboard Your Facility</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Button>

                        <div className="flex flex-col items-center gap-4 text-muted-foreground/40">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary/50 flex items-center justify-center overflow-hidden grayscale">
                                        <Users className="w-5 h-5" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Validated by 500+ Medical Institutions</span>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}
