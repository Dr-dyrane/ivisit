// PULLBACK NOTE: Apple-grade store download badges — muted surface variant
// OLD: Solid black pills on light bg — broke iVisit color rule (only primary allowed as solid)
// NEW: Muted tinted pills (bg-secondary/30) — consistent with old Expo bridge aesthetic
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { APP_DOWNLOAD_LINKS } from '@/constants/appLinks';
import { cn } from '@/lib/utils';

interface StoreLinksProps {
  className?: string;
  variant?: 'default' | 'compact';
}

const stores = [
  {
    name: 'App Store',
    label: 'Download on the',
    href: APP_DOWNLOAD_LINKS.IOS,
    icon: FaApple,
    ariaLabel: 'Coming soon on the App Store',
    iconSize: { default: 'w-6 h-6', compact: 'w-5 h-5' },
    comingSoon: true,
    badge: null,
  },
  {
    name: 'Google Play',
    label: 'Get it on',
    href: APP_DOWNLOAD_LINKS.ANDROID,
    icon: FaGooglePlay,
    ariaLabel: 'Get it on Google Play',
    iconSize: { default: 'w-[18px] h-[18px]', compact: 'w-4 h-4' },
    comingSoon: false,
    badge: 'Beta',
  },
] as const;

export function StoreLinks({ className, variant = 'default' }: StoreLinksProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      className={cn(
        // PULLBACK NOTE: Always stacked — fills parent width, parent owns constraint
        // OLD: flex-col sm:flex-row caused asymmetry inside modals
        // NEW: Stacked default, side-by-side compact (footer only)
        isCompact ? 'flex flex-row gap-2' : 'flex flex-col gap-3',
        className
      )}
    >
      {stores.map(({ name, label, href, icon: Icon, ariaLabel, iconSize, comingSoon, badge }) => {
        const button = (
          <div
            aria-label={ariaLabel}
            className={cn(
              'group flex items-center gap-4 rounded-2xl',
              'bg-secondary/30 transition-all duration-150',
              comingSoon
                ? 'opacity-40 cursor-not-allowed select-none'
                : 'hover:bg-secondary/50 active:scale-[0.98] cursor-pointer',
              isCompact
                ? 'px-4 py-3 flex-1 min-w-0'
                : 'px-6 py-4'
            )}
          >
            <Icon
              className={cn(
                'flex-shrink-0 text-foreground/70',
                isCompact ? iconSize.compact : iconSize.default
              )}
            />
            <div className="flex flex-col min-w-0">
              <span
                className={cn(
                  'font-light leading-none',
                  comingSoon ? 'text-muted-foreground/40' : 'text-muted-foreground/60',
                  isCompact ? 'text-[8px]' : 'text-[10px]'
                )}
              >
                {comingSoon ? 'Coming soon on' : label}
              </span>
              <span
                className={cn(
                  'font-semibold leading-tight truncate',
                  comingSoon ? 'text-foreground/40' : 'text-foreground/90',
                  isCompact ? 'text-xs' : 'text-sm'
                )}
              >
                {name}
              </span>
            </div>
          </div>
        );

        return (
          <div key={name} className={cn('flex items-center gap-1.5', isCompact ? 'flex-1 min-w-0' : '')}>
            {comingSoon ? (
              <div className={cn(isCompact ? 'flex-1 min-w-0' : 'w-full')}>{button}</div>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(isCompact ? 'flex-1 min-w-0' : 'w-full')}
              >
                {button}
              </a>
            )}
            {badge && (
              <span
                className={cn(
                  'flex-shrink-0 rounded-full border border-foreground/10',
                  'bg-foreground/[0.04] backdrop-blur-sm',
                  'text-foreground/40 font-medium tracking-wide',
                  'leading-none select-none',
                  isCompact ? 'text-[7px] px-1.5 py-0.5' : 'text-[8px] px-2 py-1'
                )}
              >
                {badge}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
