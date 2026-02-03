import { ShieldCheck } from 'lucide-react';
import { Container } from '../ui/Container';

const audits = [
    { name: "HIPAA Compliant", id: "H-2024-882" },
    { name: "SOC2 Type II", id: "S-991-002" },
    { name: "GDPR Ready", id: "G-110-442" },
    { name: "ISO 27001", id: "I-270-001" },
];

export default function TrustedByAudit() {
    return (
        <section className="border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden py-10">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                    {/* Label */}
                    <div className="flex items-center gap-4 min-w-fit">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Security Audits</span>
                            <span className="text-[10px] font-mono text-primary/60">LIVE MONITORING</span>
                        </div>
                    </div>

                    {/* Marquee/Grid */}
                    <div className="flex-1 w-full overflow-hidden mask-linear-fade">
                        <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-end gap-x-12 gap-y-6 opacity-60">
                            {audits.map((audit) => (
                                <div key={audit.id} className="flex items-center gap-3 group cursor-default">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-500" />
                                    <span className="text-sm font-medium text-foreground tracking-wide group-hover:text-white transition-colors">{audit.name}</span>
                                    <span className="text-[10px] font-mono text-muted-foreground/50 hidden lg:block">{audit.id}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
