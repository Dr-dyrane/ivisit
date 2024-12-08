import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Ambulance, LayoutPanelTop, X } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Dialog } from '@headlessui/react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/#services' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  
  const location = useLocation()
  const { pathname } = location
  const inEmergency = pathname === '/emergency'
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-20px)' },
  });

  return (
    <animated.nav
      style={navAnimation}
      className="fixed w-full z-50 bg-gradient-to-b from-background/90 to-transparent backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="p-2">
            <Ambulance className="h-8 w-8 text-accent-500" />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-accent-500 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => { inEmergency ? navigate('/book-bed') : navigate('/emergency') }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-600 to-accent-500 rounded-full blur opacity-15 group-hover:opacity-100 animate-pulse transition duration-300"></div>
              <div className="relative px-6 py-2 bg-accent-600 text-white rounded-full text-sm font-medium hover:bg-accent-500 transition-colors">
                {inEmergency ? 'Book Bed' : 'SOS'}
              </div>
            </button>
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
            <Link to="/" className="p-2" onClick={() => setMobileMenuOpen(false)}>
              <Ambulance className="h-8 w-8 text-accent-500" />
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
                  inEmergency ? navigate('/book-bed') : navigate('/emergency')
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