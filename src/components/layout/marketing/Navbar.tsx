import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Ambulance, LayoutPanelTop, X } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Dialog } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Button } from '@/components/ui/Button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/#services' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const location = useLocation()
  const { pathname } = location
  const inEmergency = pathname === '/emergency'

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    if (isAuthenticated) {
      navigate('/book-bed');
    } else {
      navigate('/login', { state: { from: '/book-bed' } });
    }
  };


  return (
    <animated.nav
      style={navAnimation}
      className="fixed w-full z-50 bg-background/60 backdrop-blur-2xl border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="p-2 flex items-center gap-3 group">
            <div className="relative">
              <img src="/logo.png" alt="iVisit Logo" className="h-9 w-auto transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground">iVisit<span className="text-accent">.</span></span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-[0.2em] transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="accent"
              size="md"
              showOverlay={true}
              onClick={() => { inEmergency ? handleBookBed() : handleEmergency() }}
              className="px-8 rounded-xl h-12"
            >
              <span className="font-black tracking-widest text-xs">
                {inEmergency ? 'RESERVE' : 'SOS'}
              </span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <LayoutPanelTop className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background p-4 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link to="/" className="p-2 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <img src="/logo.png" alt="iVisit Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold tracking-tighter text-foreground">iVisit</span>
            </Link>
            <button
              type="button"
              className="rounded-md p-2.5 text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent-500/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  inEmergency ? handleBookBed() : handleEmergency()
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-4"
              >
                <div className="relative group w-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-600 to-accent-500 rounded-lg blur opacity-75 group-hover:opacity-100 animate-pulse transition duration-300"></div>
                  <div className="relative w-full px-6 py-3 bg-accent-600 text-white rounded-lg text-base font-semibold hover:bg-accent-500 transition-colors text-center">
                    {inEmergency ? 'Book-Bed' : 'Emergency SOS'}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </animated.nav>
  );
}