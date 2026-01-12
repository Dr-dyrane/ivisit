import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Ambulance, LayoutPanelTop, X, Activity, ShieldCheck } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Dialog } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/#services' },
  { name: 'Protocols', href: '/#protocols' },
  { name: 'Early Access', href: '/early-access' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();
  const { pathname } = location;
  const inEmergency = pathname === '/emergency';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-20px)' },
  });

  const handleEmergency = () => {
    if (isAuthenticated) {
      navigate('/emergency');
    } else {
      navigate('/login', { state: { from: '/emergency' } });
    }
  };

  const handleBookBed = () => {
    navigate('/early-access');
  };

  return (
    <animated.nav
      ref={navRef}
      style={navAnimation}
      className={`fixed w-full z-50 transition-all duration-500 group ${
        scrolled 
          ? 'py-3 bg-background/80 backdrop-blur-2xl border-b border-border/50 shadow-lg' 
          : 'py-5 bg-transparent'
      }`}
    >
      {/* Smarty Blur Background (Subtle for Nav) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(var(--grid-color), 0.04)'}, transparent 80%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group/logo">
              <div className="relative">
                <img src="/logo.png" alt="iVisit Logo" className="h-8 w-auto transition-transform group-hover/logo:scale-110" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter text-foreground">iVisit<span className="text-primary">.</span></span>
                <span className="text-[8px] font-black text-primary uppercase tracking-[0.3em] opacity-70">Command Center</span>
              </div>
            </Link>

            {/* Status Indicator (Desktop) */}
            <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 rounded-full bg-secondary/30 border border-border/50">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                <span className="text-[9px] font-black text-foreground/60 uppercase tracking-widest">Global Status: Optimal</span>
              </div>
              <div className="w-px h-3 bg-border/50" />
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-primary opacity-60" />
                <span className="text-[9px] font-black text-foreground/60 uppercase tracking-widest">Secure</span>
              </div>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <div className="flex items-center gap-8 mr-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-[0.25em] transition-all group/link overflow-hidden py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary transform translate-x-[-100%] group-hover/link:translate-x-0 transition-transform duration-300" />
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookBed}
                className="hidden lg:flex px-5 rounded-xl h-10 border-border/50 hover:border-primary/50 text-[10px] font-black tracking-widest"
              >
                LOGISTICS
              </Button>
              <Button
                variant="accent"
                size="sm"
                showOverlay={true}
                onClick={handleEmergency}
                className="px-6 rounded-xl h-10 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span className="font-black tracking-[0.2em] text-[10px]">
                    {inEmergency ? 'STANDBY' : 'LAUNCH SOS'}
                  </span>
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2.5 text-foreground bg-secondary/50 border border-border/50"
            onClick={() => setMobileMenuOpen(true)}
          >
            <LayoutPanelTop className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background/95 backdrop-blur-3xl border-l border-border/50 p-6 sm:max-w-sm">
          <div className="flex items-center justify-between mb-12">
            <Link to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
              <img src="/logo.png" alt="iVisit Logo" className="h-8 w-auto" />
              <span className="text-xl font-black tracking-tighter text-foreground">iVisit<span className="text-primary">.</span></span>
            </Link>
            <button
              type="button"
              className="rounded-xl p-2 text-foreground bg-secondary/50 border border-border/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">System Ready</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">Command-grade medical dispatch infrastructure active.</p>
            </div>
            
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center justify-between p-4 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] text-foreground hover:bg-secondary/50 border border-transparent hover:border-border/50 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                  <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <Button
                variant="accent"
                className="w-full h-14 rounded-2xl shadow-xl shadow-primary/20"
                onClick={() => {
                  handleEmergency();
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <Activity className="w-5 h-5 animate-pulse" />
                  <span className="font-black tracking-[0.2em] text-xs">LAUNCH SOS</span>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl border-border/50"
                onClick={() => {
                  handleBookBed();
                  setMobileMenuOpen(false);
                }}
              >
                <span className="font-black tracking-[0.2em] text-xs">LOGISTICS CENTER</span>
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-0 w-full px-6">
            <p className="text-center text-[8px] font-black text-muted-foreground uppercase tracking-[0.5em] opacity-30">
              SECURE COMMAND CHANNEL
            </p>
          </div>
        </Dialog.Panel>
      </Dialog>
    </animated.nav>
  );
}