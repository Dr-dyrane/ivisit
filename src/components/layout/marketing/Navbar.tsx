import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutPanelTop, X, Moon, Sun } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Dialog } from '@headlessui/react';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeContext';
import { usePreviewBridge } from './PreviewBridgeProvider';

const navigation = [
  { name: 'Home', href: '/#home' },
  { name: 'How It Helps', href: '/#help' },
  { name: 'How It Works', href: '/#how-it-works' },
  { name: 'For Facilities', href: '/#providers' },
  { name: 'Updates', href: '/#updates' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { openPreviewBridge, previewCtaLabel } = usePreviewBridge();
  const { pathname } = location;

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
        ? 'py-3 bg-background/80 backdrop-blur-2xl shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.25)]'
        : 'py-5 bg-transparent'
        }`}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(var(--grid-color), 0.04)'}, transparent 80%)`,
        }}
      />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group/logo flex-shrink-0">
              <div className="relative">
                <img src="/logo.png" alt="iVisit Logo" className="h-8 w-auto transition-transform group-hover/logo:scale-110" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base sm:text-lg font-black tracking-tighter text-foreground">iVisit<span className="text-primary">.</span></span>
                <span className="text-[8px] sm:text-[9px] font-black text-primary uppercase tracking-[0.15em] opacity-70">Emergency Response</span>
              </div>
            </Link>
          </div>

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
                className="h-9 rounded-xl bg-background/70 px-3 text-xs font-black tracking-widest shadow-sm shadow-black/5 dark:bg-white/10 dark:shadow-black/20 lg:h-10"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-400" />
                )}
              </Button>
              <Button
                variant="accent"
                size="sm"
                showOverlay={true}
                onClick={openPreviewBridge}
                className="h-9 flex-shrink-0 rounded-xl border-0 px-3 shadow-[0_0_20px_rgba(var(--primary),0.3)] lg:h-10 lg:px-6"
              >
                <div className="flex items-center gap-2">
                  <span className="font-black tracking-[0.15em] text-xs whitespace-nowrap">{previewCtaLabel}</span>
                </div>
              </Button>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl bg-background/70 p-2.5 text-foreground shadow-lg shadow-black/5 dark:bg-white/10 dark:shadow-black/20 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <LayoutPanelTop className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background/95 p-6 shadow-2xl shadow-black/20 backdrop-blur-3xl sm:max-w-sm">
          <div className="flex items-center justify-between mb-12">
            <Link to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
              <img src="/logo.png" alt="iVisit Logo" className="h-8 w-auto" />
              <span className="text-xl font-black tracking-tighter text-foreground">iVisit<span className="text-primary">.</span></span>
            </Link>
            <button
              type="button"
              className="rounded-xl bg-background/70 p-2 text-foreground shadow-sm shadow-black/5 dark:bg-white/10 dark:shadow-black/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="mb-4 rounded-2xl bg-secondary/35 p-4 shadow-sm shadow-black/5 dark:shadow-black/20">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Request help and check bed availability from your phone.
              </p>
            </div>

            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center justify-between rounded-xl p-4 text-xs font-light uppercase tracking-[0.15em] text-foreground transition-all hover:bg-secondary/50 sm:text-sm"
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
                className="h-14 w-full rounded-2xl border-0 shadow-xl shadow-primary/20"
                onClick={() => {
                  openPreviewBridge();
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="font-black tracking-[0.2em] text-xs">{previewCtaLabel}</span>
                </div>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-8 left-0 w-full px-6">
            <p className="text-center text-xs sm:text-sm font-black text-muted-foreground uppercase tracking-[0.5em] opacity-30">
              CLEAR NEXT STEPS
            </p>
          </div>
        </Dialog.Panel>
      </Dialog>
    </animated.nav>
  );
}
