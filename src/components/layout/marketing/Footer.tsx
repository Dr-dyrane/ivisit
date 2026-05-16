import { useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../../providers/ThemeContext';
import { Button } from '../../ui/Button';
import { StoreLinks } from '../../ui/StoreLinks';

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  const footerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer ref={footerRef} className="relative z-10 bg-gradient-to-b from-background to-secondary/10 transition-colors duration-300">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="relative">
                <img src="/logo.png" alt="iVisit Logo" className="h-9 w-auto" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-2xl font-black text-foreground tracking-tighter">iVisit<span className="text-primary">.</span></span>
            </div>
            <p className="mt-6 text-muted-foreground leading-relaxed text-sm font-light max-w-xs">
              Emergency medical response and hospital coordination designed around clear next steps.
            </p>
          </div>

          <div>
            <h3 className="font-light text-foreground uppercase tracking-[0.2em] text-xs sm:text-sm mb-8 sm:mb-12 opacity-60">Explore</h3>
            <ul className="space-y-6">
              <li><Link to="/#home" onClick={(e) => handleNavClick(e, '/#home')} className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">Home</Link></li>
              <li><Link to="/#help" onClick={(e) => handleNavClick(e, '/#help')} className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">How It Helps</Link></li>
              <li><Link to="/#how-it-works" onClick={(e) => handleNavClick(e, '/#how-it-works')} className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">How It Works</Link></li>
              <li><Link to="/#providers" onClick={(e) => handleNavClick(e, '/#providers')} className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">For Facilities</Link></li>
              <li><Link to="/#updates" onClick={(e) => handleNavClick(e, '/#updates')} className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">Updates</Link></li>
              {/* <li className="mt-8 rounded-2xl bg-secondary/20 px-4 py-4">
                <p className="text-xs sm:text-sm font-light text-primary uppercase tracking-wider mb-1">Support</p>
                <a href="mailto:support@ivisit.ng" className="block text-xs text-muted-foreground font-light hover:text-foreground transition-colors">support@ivisit.ng</a>
                <a href="tel:+19517284218" className="block text-xs text-muted-foreground font-light hover:text-foreground transition-colors">+1 951 728 4218</a>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="font-light text-foreground uppercase tracking-[0.2em] text-xs sm:text-sm mb-8 sm:mb-12 opacity-60">Legal</h3>
            <ul className="space-y-6">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">Terms of Service</Link></li>
              <li><Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">Support Protocol</Link></li>
              <li><Link to="/medical-disclaimer" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">Medical Disclaimer</Link></li>
              <li><Link to="/health-data-consent" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">Health Data Consent</Link></li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-light text-foreground uppercase tracking-[0.2em] text-xs sm:text-sm mb-8 sm:mb-12 opacity-60">Get the App</h3>
            <StoreLinks variant="compact" className="mb-8" />

            <h3 className="font-light text-foreground uppercase tracking-[0.2em] text-xs sm:text-sm mb-6 opacity-60">Preferences</h3>
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="h-14 w-full rounded-2xl bg-background/70 px-8 shadow-sm shadow-black/5 dark:bg-white/10 dark:shadow-black/20"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-5 w-5 text-yellow-500" />
                  <span className="text-xs font-light uppercase tracking-wider ml-2">Luminous</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5 text-blue-400" />
                  <span className="text-xs font-light uppercase tracking-wider ml-2">Night Ops</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-24 pt-12">
          <p className="text-center text-muted-foreground text-xs sm:text-sm font-light uppercase tracking-[0.3em] opacity-40">
            (c) {new Date().getFullYear()} IVISIT | EMERGENCY RESPONSE, CLEARER
          </p>
        </div>
      </div>
    </footer>
  );
}
