import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../providers/ThemeContext';
import { Button } from '../../ui/Button';

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  const footerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer ref={footerRef} className="bg-background border-t border-border relative z-10 transition-colors duration-300 overflow-hidden group">
      {/* Smarty Blur Background */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(var(--grid-color), 0.05)'}, transparent 80%)`,
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
        style={{
          maskImage: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, black, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, black, transparent 80%)`,
        }}
      >
        <div className={`absolute inset-0 backdrop-blur-[3px] ${theme === 'dark' ? 'bg-white/[0.01]' : 'bg-primary/[0.02]'} `} />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
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
               <a href="#" className="group flex items-center gap-3 px-4 py-2 rounded-xl border border-foreground/20 hover:border-primary/50 transition-all hover:scale-105 active:scale-95 bg-transparent min-w-[160px] h-[52px] w-fit">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
                    alt="Apple" 
                    className="h-6 w-auto dark:invert transition-colors"
                  />
                  <div className="flex flex-col leading-none text-left">
                    <span className="text-[9px] font-bold uppercase tracking-tighter opacity-60">Download on the</span>
                    <span className="text-base font-black tracking-tight">App Store</span>
                  </div>
               </a>
               <a href="#" className="group flex items-center gap-3 px-4 py-2 rounded-xl border border-foreground/20 hover:border-primary/50 transition-all hover:scale-105 active:scale-95 bg-transparent min-w-[160px] h-[52px] w-fit">
                  <svg viewBox="0 0 512 512" className="h-6 w-auto">
                    <path fill="#4285F4" d="M12 12L12 500L350 256L12 12Z" />
                    <path fill="#34A853" d="M12 500L440 330L350 256L12 500Z" />
                    <path fill="#FBBC05" d="M440 330L500 256L440 182L350 256L440 330Z" />
                    <path fill="#EA4335" d="M12 12L350 256L440 182L12 12Z" />
                  </svg>
                  <div className="flex flex-col leading-none text-left">
                    <span className="text-[9px] font-bold uppercase tracking-tighter opacity-60">Get it on</span>
                    <span className="text-base font-black tracking-tight whitespace-nowrap">Google Play</span>
                  </div>
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