import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../providers/ThemeContext';
import { Button } from '../../ui/Button';

export default function Footer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-background border-t border-border relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            <h3 className="font-black text-foreground uppercase tracking-[0.3em] text-[10px] mb-8 opacity-50">Operations</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide">Home</Link></li>
              <li><a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide">Services</a></li>
              <li><a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide">Command Center</a></li>
              <li className="pt-4 border-t border-border/10">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">USA HQ</p>
                <p className="text-xs text-muted-foreground">California Command</p>
                <p className="text-xs text-muted-foreground">+1 951 728 4218</p>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-black text-foreground uppercase tracking-[0.3em] text-[10px] mb-8 opacity-50">Legal</h3>
            <ul className="space-y-4">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide">Terms of Service</Link></li>
              <li><Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide">Support Protocol</Link></li>
            </ul>
            <div className="mt-8 pt-8 border-t border-border/10 flex flex-col gap-4">
               <a href="#" className="transition-transform hover:scale-105 active:scale-95 w-fit">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="Download on the App Store" 
                    className="h-10 w-auto"
                  />
               </a>
               <a href="#" className="transition-transform hover:scale-105 active:scale-95 w-fit">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-[58px] w-auto -ml-1"
                  />
               </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-black text-foreground uppercase tracking-[0.3em] text-[10px] mb-8 opacity-50">Preferences</h3>
            <Button
              variant="default"
              showOverlay={true}
              onClick={toggleTheme}
              className="px-8 rounded-2xl h-14 w-full"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-5 w-5 text-yellow-500" />
                  <span className="text-xs font-black uppercase tracking-widest ml-2">Luminous</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5 text-blue-400" />
                  <span className="text-xs font-black uppercase tracking-widest ml-2">Night Ops</span>
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-center text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
            © {new Date().getFullYear()} IVISIT COMMAND • ALL SYSTEMS OPERATIONAL
          </p>
        </div>
      </div>
    </footer>
  );
}