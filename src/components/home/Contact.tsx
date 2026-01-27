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
    <div id="contact" className="min-h-screen flex items-center justify-center bg-transparent">
      <animated.div style={fadeIn} className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.06em] text-foreground mb-12 leading-[0.8]">
            Command Center<span className="text-primary">.</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl font-light text-muted-foreground leading-relaxed tracking-[-0.02em]">
            Direct uplink to emergency dispatchers and medical coordination officers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 mb-24">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="p-12 rounded-3xl text-center bg-background/20 backdrop-blur-3xl group"
            >
              <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-3xl bg-secondary border border-border mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 text-primary">
                {info.icon}
              </div>
              <h3 className="text-xl font-light text-foreground mb-3 tracking-tight">{info.title}</h3>
              <p className="text-muted-foreground font-mono uppercase tracking-[0.2em] text-sm opacity-70 group-hover:opacity-100 transition-opacity">{info.content}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-6 md:p-12 lg:p-20 rounded-3xl bg-background/20 backdrop-blur-3xl">
            <form className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-4">
                <label className="text-sm font-light uppercase tracking-[0.15em] text-primary ml-2">Reporting Officer</label>
                <input
                  type="text"
                  className="w-full px-6 py-5 bg-secondary border border-border rounded-2xl text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/30 outline-none backdrop-blur-md"
                  placeholder="IDENTIFY YOURSELF"
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-light uppercase tracking-[0.15em] text-primary ml-2">Uplink Address</label>
                <input
                  type="email"
                  className="w-full px-6 py-5 bg-secondary border border-border rounded-2xl text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/30 outline-none backdrop-blur-md"
                  placeholder="EMAIL@PROTOCOL.COM"
                />
              </div>
              <div className="space-y-4 md:col-span-2">
                <label className="text-sm font-light uppercase tracking-[0.15em] text-primary ml-2">Situation Briefing</label>
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
                  className="w-full py-6 sm:py-12 text-sm sm:text-lg font-black tracking-widest sm:tracking-[0.2em] uppercase rounded-2xl shadow-2xl shadow-accent/20 whitespace-nowrap"
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