import { useEffect, useState } from 'react';
import {
  Activity,
  BedDouble,
  Building2,
  CheckCircle2,
  Clock,
  MapPin,
  Shield,
  Users,
} from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { GoogleMapEmbed } from '../../ui/GoogleMapEmbed';

interface DesktopDashboardReplicaProps {
  isActive: boolean;
  mode: 'emergency' | 'bed';
}

export function DesktopDashboardReplica({ isActive, mode }: DesktopDashboardReplicaProps) {
  const [count, setCount] = useState(0);
  const [viewMode, setViewMode] = useState<'dashboard' | 'map'>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const isBed = mode === 'bed';
  const primaryColor = isBed ? 'bg-blue-600' : 'bg-destructive';

  const incidentLocation = { lat: 40.7128, lng: -74.006 };
  const unitLocation = { lat: 40.715, lng: -74.008 };

  useEffect(() => {
    if (isActive) {
      setCount(1);
      const timer = setTimeout(() => {
        setViewMode('map');
      }, 2000);

      return () => clearTimeout(timer);
    }

    setCount(0);
    setViewMode('dashboard');
    return undefined;
  }, [isActive]);

  const pulse = useSpring({
    from: { opacity: 0.5 },
    to: { opacity: 1 },
    loop: { reverse: true },
    config: { duration: 1500 },
    pause: !isActive,
  });

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-slate-50 p-4 shadow-2xl transition-colors duration-300 dark:bg-[#0B0F1A] sm:p-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="absolute left-6 top-4 z-30 flex gap-2">
        <div className="h-3 w-3 rounded-full border border-black/5 bg-[#FF5F57] shadow-sm" />
        <div className="h-3 w-3 rounded-full border border-black/5 bg-[#FEBC2E] shadow-sm" />
        <div className="h-3 w-3 rounded-full border border-black/5 bg-[#28C840] shadow-sm" />
      </div>

      <div className="relative z-20 mb-6 flex items-center justify-between pl-16 transition-all duration-500 sm:mb-10 sm:pl-0 sm:pt-4">
        <div className="sm:pl-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            {isBed ? 'Bed availability' : 'Live response tracking'}
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                isActive
                  ? `${primaryColor} animate-pulse shadow-[0_0_8px_currentColor]`
                  : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]'
              }`}
            />
            <span className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
              {isActive ? (isBed ? 'Bed request received' : 'Responder notified') : 'Ready to track'}
            </span>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <div className="rounded-xl bg-white/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 shadow-sm backdrop-blur-sm dark:bg-secondary/20 dark:text-muted-foreground sm:px-4 sm:py-2 sm:text-xs">
            {viewMode === 'map' ? 'ETA VIEW' : 'LIVE VIEW'}
          </div>
        </div>
      </div>

      <div className="relative min-h-0 grow">
        <div
          className={`absolute inset-0 grid grid-cols-2 gap-3 transition-all duration-700 sm:gap-6 lg:grid-cols-3 ${
            viewMode === 'dashboard'
              ? 'z-10 scale-100 opacity-100'
              : 'pointer-events-none z-0 scale-95 opacity-0'
          }`}
        >
          <div
            className={`group relative col-span-2 row-span-1 overflow-hidden rounded-[2rem] p-6 transition-all duration-500 lg:row-span-2 sm:p-10 ${
              isActive
                ? `${primaryColor} text-white shadow-2xl`
                : isDarkMode
                  ? 'bg-white/[0.03] shadow-inner backdrop-blur-xl'
                  : 'bg-white/40 shadow-lg backdrop-blur-xl'
            }`}
          >
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors sm:h-12 sm:w-12 sm:rounded-2xl ${
                    isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-muted/10'
                  }`}
                >
                  {isBed ? (
                    <BedDouble
                      className={`h-5 w-5 sm:h-6 sm:w-6 ${isActive ? 'text-white' : 'text-blue-500'}`}
                    />
                  ) : (
                    <Activity
                      className={`h-5 w-5 sm:h-6 sm:w-6 ${isActive ? 'text-white' : 'text-destructive'}`}
                    />
                  )}
                </div>
                {isActive && (
                  <animated.div
                    style={pulse}
                    className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm"
                  >
                    New
                  </animated.div>
                )}
              </div>

              <div>
                <div
                  className={`mb-1 text-4xl font-semibold tracking-tighter transition-all duration-500 sm:text-7xl ${
                    isActive ? 'text-white' : 'text-slate-900 dark:text-foreground'
                  }`}
                >
                  {count}
                </div>
                <p
                  className={`text-sm font-medium transition-colors sm:text-lg ${
                    isActive ? 'text-white/80' : 'text-slate-500 dark:text-muted-foreground'
                  }`}
                >
                  {isBed ? 'Bed request' : 'Active response'}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`relative col-span-1 overflow-hidden rounded-[2rem] p-6 transition-all duration-300 hover:shadow-xl sm:p-8 ${
              isActive && !isBed ? 'animate-pulse' : ''
            } ${
              isDarkMode
                ? 'bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.06]'
                : 'bg-white/30 shadow-sm backdrop-blur-xl hover:bg-white/40'
            }`}
          >
            <div className="mb-4 flex items-start justify-between sm:mb-12">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 sm:h-12 sm:w-12 sm:rounded-2xl">
                <Clock className="h-4 w-4 text-green-500 sm:h-6 sm:w-6" />
              </div>
            </div>
            <div>
              <div className="mb-0.5 text-xl font-semibold tracking-tight text-slate-900 dark:text-foreground sm:mb-1 sm:text-4xl">
                {isActive ? '4 min' : 'ETA'}
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-muted-foreground sm:text-base">
                {isBed ? 'Availability updates' : 'Arrival updates'}
              </p>
            </div>
          </div>

          <div
            className={`relative col-span-1 overflow-hidden rounded-[2rem] p-6 transition-all duration-300 hover:shadow-xl sm:p-8 ${
              isDarkMode
                ? 'bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.06]'
                : 'bg-white/30 shadow-sm backdrop-blur-xl hover:bg-white/40'
            }`}
          >
            <div className="mb-4 flex items-start justify-between sm:mb-12">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 sm:h-12 sm:w-12 sm:rounded-2xl">
                {isBed ? (
                  <Building2 className="h-4 w-4 text-blue-500 sm:h-6 sm:w-6" />
                ) : (
                  <MapPin className="h-4 w-4 text-blue-500 sm:h-6 sm:w-6" />
                )}
              </div>
            </div>
            <div>
              <div className="mb-0.5 text-xl font-semibold tracking-tight text-slate-900 dark:text-foreground sm:mb-1 sm:text-4xl">
                Shared
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-muted-foreground sm:text-base">
                {isBed ? 'Hospital options' : 'Location shared'}
              </p>
            </div>
          </div>

          <div
            className={`hidden rounded-[2rem] p-6 text-center lg:flex lg:flex-col lg:items-center lg:justify-center ${
              isDarkMode
                ? 'bg-white/5 backdrop-blur-md'
                : 'bg-white/50 shadow-sm backdrop-blur-md'
            }`}
          >
            <CheckCircle2 className="mb-3 h-8 w-8 text-slate-400" />
            <p className="text-sm font-medium text-slate-500 dark:text-muted-foreground">
              Clear next steps
            </p>
          </div>
        </div>

        <div
          className={`absolute inset-0 overflow-hidden rounded-[1.5rem] transition-all duration-700 sm:rounded-[2rem] ${
            viewMode === 'map'
              ? 'z-30 scale-100 opacity-100'
              : 'pointer-events-none z-0 scale-105 opacity-0'
          } ${isDarkMode ? 'bg-[#0B0F1A]' : 'bg-white'}`}
        >
          <div className="absolute inset-0 z-0">
            <GoogleMapEmbed
              isDarkMode={isDarkMode}
              center={incidentLocation}
              zoom={14}
              markers={[
                { ...incidentLocation, title: 'Incident' },
                { ...unitLocation, title: 'Unit 402' },
              ]}
              className="h-full w-full"
            />
          </div>

          <div
            className={`absolute left-4 top-4 rounded-xl p-2 shadow-xl backdrop-blur-md sm:left-6 sm:top-6 sm:p-4 ${
              isDarkMode ? 'bg-[#0B0F1A]/15' : 'bg-white/15'
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10 ${primaryColor}`}>
                {isBed ? (
                  <BedDouble className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                ) : (
                  <Shield className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                )}
              </div>
              <div>
                <div className={`text-[10px] font-bold sm:text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {isBed ? 'Reservation Confirmed' : 'Responder Notified'}
                </div>
                <div
                  className={`text-[8px] font-mono opacity-60 sm:text-xs ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Location shared live
                </div>
              </div>
            </div>
          </div>

          <div
            className={`absolute bottom-4 right-4 w-48 rounded-xl p-2 shadow-xl backdrop-blur-md sm:bottom-6 sm:right-6 sm:w-64 sm:p-4 ${
              isDarkMode ? 'bg-[#0B0F1A]/15' : 'bg-white/15'
            }`}
          >
            <div className="mb-1 flex items-center justify-between sm:mb-2">
              <span
                className={`text-[8px] font-bold uppercase sm:text-xs ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Nearest Unit
              </span>
              <span className="text-[8px] font-bold text-green-500 sm:text-xs">LIVE</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full sm:h-8 sm:w-8 ${
                  isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                }`}
              >
                <Users
                  className={`h-3 w-3 sm:h-4 sm:w-4 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                />
              </div>
              <div>
                <div className={`text-[10px] font-medium sm:text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Unit 402
                </div>
                <div className="text-[8px] text-slate-500 sm:text-xs">
                  ETA:{' '}
                  <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    4 min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
