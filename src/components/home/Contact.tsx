import { Phone, Mail, Clock } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export default function Contact() {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 }
  });

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Emergency Hotline",
      content: "+1 951 728 4218"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "California Command",
      content: "USA HQ • INTL OPS"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Operational Status",
      content: "24/7 Global"
    }
  ];

  return (
    <div id="contact" className="py-32 bg-transparent relative z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <animated.div style={fadeIn} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Secure Communications
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6">
            Command Center<span className="text-primary">.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-light">
            Direct uplink to emergency dispatchers and medical coordination officers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-24">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="p-10 rounded-[2.5rem] text-center bg-background/20 backdrop-blur-3xl group"
            >
              <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-3xl bg-secondary border border-border mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 text-primary">
                {info.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">{info.title}</h3>
              <p className="text-muted-foreground font-mono uppercase tracking-[0.2em] text-xs opacity-70 group-hover:opacity-100 transition-opacity">{info.content}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-16 rounded-[3rem] bg-background/20 backdrop-blur-3xl relative overflow-hidden group">
            {/* Form HUD */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary/10 rounded-tl-[3rem] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-accent/10 rounded-br-[3rem] pointer-events-none" />

            <form className="grid grid-cols-1 gap-12 md:grid-cols-2 relative z-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-2">Reporting Officer</label>
                <input
                  type="text"
                  className="w-full px-6 py-5 bg-secondary border border-border rounded-2xl text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/30 outline-none backdrop-blur-md"
                  placeholder="IDENTIFY YOURSELF"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-2">Uplink Address</label>
                <input
                  type="email"
                  className="w-full px-6 py-5 bg-secondary border border-border rounded-2xl text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/30 outline-none backdrop-blur-md"
                  placeholder="EMAIL@PROTOCOL.COM"
                />
              </div>
              <div className="space-y-4 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-2">Situation Briefing</label>
                <textarea
                  rows={4}
                  className="w-full px-6 py-5 bg-secondary border border-border rounded-2xl text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/30 outline-none backdrop-blur-md resize-none"
                  placeholder="DESCRIBE THE MEDICAL EMERGENCY IN DETAIL..."
                />
              </div>
              <div className="md:col-span-2 pt-6">
                <Button
                  variant="accent"
                  showOverlay={true}
                  className="w-full py-10 text-xl font-black tracking-[0.4em] uppercase rounded-2xl shadow-2xl shadow-accent/20"
                >
                  Initiate Transmission
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </animated.div>
    </div>
  );
}