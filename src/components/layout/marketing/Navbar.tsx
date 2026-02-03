import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutPanelTop, X, Activity, ShieldCheck, Moon, Sun } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Dialog } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeContext';
import { getAppDownloadLink } from '@/constants/appLinks';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/#services' },
  { name: 'Protocols', href: '/#protocols' },
  { name: 'Early Access', href: '/early-access' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
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
      window.open(getAppDownloadLink('expo-preview'), '_blank');
    }
  };

  const handleBookBed = () => {
    navigate('/early-access');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const navbarHeight = scrolled ? 80 : 100;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <animated.nav
      ref={navRef}
      style={navAnimation}
      className={`fixed w-full z-50 transition-all duration-500 group ${scrolled
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

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group/logo flex-shrink-0">
              <div className="relative">
                <img src="/logo.png" alt="iVisit Logo" className="h-8 w-auto transition-transform group-hover/logo:scale-110" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base sm:text-lg font-black tracking-tighter text-foreground">iVisit<span className="text-primary">.</span></span>
                <span className="text-[8px] sm:text-[9px] font-black text-primary uppercase tracking-[0.15em] opacity-70">Command</span>
              </div>
            </Link>

            {/* Status Indicator (Desktop) */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 border border-border/50 flex-shrink-0 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                <span className="font-black text-foreground/60 uppercase tracking-wider whitespace-nowrap">Optimal</span>
              </div>
              <div className="w-px h-2 bg-border/50" />
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-primary opacity-60 flex-shrink-0" />
                <span className="font-black text-foreground/60 uppercase tracking-wider">Secure</span>
              </div>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
            <div className="flex items-center gap-3 lg:gap-6 lg:mr-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative text-muted-foreground hover:text-foreground text-xs font-light uppercase tracking-[0.15em] transition-all group/link overflow-hidden py-2 whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-[0.5px] bg-primary transform translate-x-[-100%] group-hover/link:translate-x-0 transition-transform duration-300" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="px-3 rounded-xl h-9 lg:h-10 border-border/50 hover:border-primary/50 text-xs font-black tracking-widest"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-400" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookBed}
                className="hidden lg:flex px-3 lg:px-5 rounded-xl h-9 lg:h-10 border-border/50 hover:border-primary/50 text-xs font-black tracking-widest"
              >
                ACCESS
              </Button>
              <Button
                variant="accent"
                size="sm"
                showOverlay={true}
                onClick={handleEmergency}
                className="px-3 lg:px-6 rounded-xl h-9 lg:h-10 shadow-[0_0_20px_rgba(var(--primary),0.3)] flex-shrink-0"
              >
                <div className="flex items-center gap-1 lg:gap-2">
                  <Activity className="w-3 h-3 lg:w-3.5 lg:h-3.5 animate-pulse flex-shrink-0" />
                  <span className="font-black tracking-[0.15em] text-xs whitespace-nowrap">
                    {inEmergency ? 'STANDBY' : 'LIVE PREVIEW'}
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
        </div >
      </div >

      {/* Mobile menu */}
      < Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen} >
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
                <span className="text-xs sm:text-sm font-light uppercase tracking-widest text-foreground/60">System Ready</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Command-grade medical dispatch infrastructure active.</p>
            </div>

            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center justify-between p-4 rounded-xl text-xs sm:text-sm font-light uppercase tracking-[0.15em] text-foreground hover:bg-secondary/50 border border-transparent hover:border-border/50 transition-all"
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setMobileMenuOpen(false);
                  }}
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
                  <span className="font-black tracking-[0.2em] text-xs">LAUNCH PREVIEW</span>
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
                <span className="font-black tracking-[0.2em] text-xs">JOIN THE MISSION</span>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-8 left-0 w-full px-6">
            <p className="text-center text-xs sm:text-sm font-black text-muted-foreground uppercase tracking-[0.5em] opacity-30">
              SECURE COMMAND CHANNEL
            </p>
          </div>
        </Dialog.Panel>
      </Dialog >
    </animated.nav >
  );
}