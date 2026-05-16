// PULLBACK NOTE: Apple-grade store download badges
// OLD: Row layout with floating "Get" label, generic sizing
// NEW: Solid tinted pills — icon + micro label + store name, single tap target
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
    ariaLabel: 'Download on the App Store',
    iconSize: { default: 'w-7 h-7', compact: 'w-5 h-5' },
  },
  {
    name: 'Google Play',
    label: 'Get it on',
    href: APP_DOWNLOAD_LINKS.ANDROID,
    icon: FaGooglePlay,
    ariaLabel: 'Get it on Google Play',
    iconSize: { default: 'w-5 h-5', compact: 'w-4 h-4' },
  },
] as const;

export function StoreLinks({ className, variant = 'default' }: StoreLinksProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      className={cn(
        'flex gap-3',
        isCompact ? 'flex-row' : 'flex-col sm:flex-row',
        className
      )}
    >
      {stores.map(({ name, label, href, icon: Icon, ariaLabel, iconSize }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={cn(
            'group flex items-center gap-3 rounded-2xl bg-foreground/90 dark:bg-white/10',
            'hover:bg-foreground hover:dark:bg-white/15 active:scale-[0.97]',
            'transition-all duration-150',
            isCompact
              ? 'px-4 py-2.5 flex-1 min-w-0'
              : 'px-5 py-3.5'
          )}
        >
          <Icon
            className={cn(
              'flex-shrink-0 text-background dark:text-foreground',
              isCompact ? iconSize.compact : iconSize.default
            )}
          />
          <div className="flex flex-col min-w-0">
            <span
              className={cn(
                'text-background/70 dark:text-foreground/50 font-light leading-none',
                isCompact ? 'text-[8px]' : 'text-[10px]'
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                'text-background dark:text-foreground font-semibold leading-tight truncate',
                isCompact ? 'text-xs' : 'text-sm'
              )}
            >
              {name}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
