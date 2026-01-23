import { useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../providers/ThemeContext';
import { Button } from '../../ui/Button';

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer ref={footerRef} className="bg-background border-t border-border relative z-10 transition-colors duration-300">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="relative">
                <img src="/logo.png" alt="iVisit Logo" className="h-9 w-auto" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-2xl font-black text-foreground tracking-tighter">iVisit<span className="text-primary">.</span></span>
            </div>
            <p className="mt-6 text-muted-foreground leading-relaxed text-sm font-light max-w-xs">
              Next-generation medical response protocols. Real-time intelligence for life-critical decisions.
            </p>
          </div>
          
          <div>
            <h3 className="font-light text-foreground uppercase tracking-[0.2em] text-xs sm:text-sm mb-12 opacity-60">Operations</h3>
            <ul className="space-y-6">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">Home</Link></li>
              <li><a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">Services</a></li>
              <li><a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">Command Center</a></li>
              <li className="pt-6 border-t border-border/10">
                <p className="text-xs sm:text-sm font-light text-primary uppercase tracking-wider mb-1">USA HQ</p>
                <p className="text-xs text-muted-foreground font-light">California Command</p>
                <p className="text-xs text-muted-foreground font-light">+1 951 728 4218</p>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-light text-foreground uppercase tracking-[0.2em] text-xs sm:text-sm mb-12 opacity-60">Legal</h3>
            <ul className="space-y-6">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">Terms of Service</Link></li>
              <li><Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide font-light">Support Protocol</Link></li>
            </ul>
            <div className="mt-12 pt-12 border-t border-border/10 flex flex-row md:flex-col gap-4">
               <a 
                 href="https://expo.dev/preview/update?message=modified%3A+++services%2FinsuranceService.js&updateRuntimeVersion=1.0.0&createdAt=2026-01-20T19%3A56%3A27.878Z&slug=exp&projectId=a3777b70-b973-4b3b-ba59-ed32bf5662e0&group=929eee2a-83cd-497e-8f88-c42c58648467" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="group flex items-center gap-3 px-4 py-2 rounded-xl border border-foreground/20 hover:border-primary/50 transition-all hover:scale-105 active:scale-95 bg-transparent min-w-[160px] h-[52px] w-fit"
               >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
                    alt="Apple" 
                    className="h-6 w-auto dark:invert transition-colors"
                  />
                  <div className="flex flex-col leading-none text-left">
                    <span className="text-xs sm:text-sm font-light uppercase tracking-tighter opacity-60">Download on the</span>
                    <span className="text-base font-black tracking-tight">App Store</span>
                  </div>
               </a>
               <a 
                 href="https://expo.dev/preview/update?message=modified%3A+++services%2FinsuranceService.js&updateRuntimeVersion=1.0.0&createdAt=2026-01-20T19%3A56%3A27.878Z&slug=exp&projectId=a3777b70-b973-4b3b-ba59-ed32bf5662e0&group=929eee2a-83cd-497e-8f88-c42c58648467" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="group flex items-center gap-3 px-4 py-2 rounded-xl border border-foreground/20 hover:border-primary/50 transition-all hover:scale-105 active:scale-95 bg-transparent min-w-[160px] h-[52px] w-fit"
               >
                  <svg viewBox="0 0 512 512" className="h-6 w-auto">
                    <path fill="#4285F4" d="M12 12L12 500L350 256L12 12Z" />
                    <path fill="#34A853" d="M12 500L440 330L350 256L12 500Z" />
                    <path fill="#FBBC05" d="M440 330L500 256L440 182L350 256L440 330Z" />
                    <path fill="#EA4335" d="M12 12L350 256L440 182L12 12Z" />
                  </svg>
                  <div className="flex flex-col leading-none text-left">
                    <span className="text-xs sm:text-sm font-light uppercase tracking-tighter opacity-60">Get it on</span>
                    <span className="text-base font-black tracking-tight whitespace-nowrap">Google Play</span>
                  </div>
               </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-light text-foreground uppercase tracking-[0.2em] text-xs sm:text-sm mb-12 opacity-60">Preferences</h3>
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="px-8 rounded-2xl h-14 w-full border border-border/50 hover:border-primary/50"
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
        
        <div className="mt-24 pt-12 border-t border-border/10">
          <p className="text-center text-muted-foreground text-xs sm:text-sm font-light uppercase tracking-[0.3em] opacity-40">
            © {new Date().getFullYear()} IVISIT COMMAND • ALL SYSTEMS OPERATIONAL
          </p>
        </div>
      </div>
    </footer>
  );
}