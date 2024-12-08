import { Phone, Mail, Clock } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

export default function Contact() {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 }
  });

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Emergency",
      content: "1-800-IVISIT-1"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "help@ivisit.com"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Available",
      content: "24/7"
    }
  ];

  return (
    <div id="contact" className="py-24 bg-background">
      <animated.div style={fadeIn} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contact
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Here for you, always
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-accent-500/10 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-card backdrop-blur-sm p-8 rounded-3xl border border-border">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-2xl bg-accent-500/10 text-accent-500">
                  {info.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">{info.title}</h3>
                <p className="mt-2 text-muted-foreground">{info.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-accent-500/10 rounded-3xl blur opacity-30"></div>
            <div className="relative bg-card backdrop-blur-sm p-8 rounded-3xl border border-border">
              <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-accent-600 text-white rounded-xl hover:bg-accent-500 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}