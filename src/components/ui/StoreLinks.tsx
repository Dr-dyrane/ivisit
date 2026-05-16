// PULLBACK NOTE: Store link buttons with real brand icons
// OLD: Lucide Apple + Smartphone icons (generic)
// NEW: react-icons FaApple + FaGooglePlay (real brand marks)
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { getClientPlatform, APP_DOWNLOAD_LINKS } from '@/constants/appLinks';
import { cn } from '@/lib/utils';

interface StoreLinksProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function StoreLinks({ className, variant = 'default' }: StoreLinksProps) {
  const platform = getClientPlatform();
  const isCompact = variant === 'compact';

  const linkClass = cn(
    'flex items-center justify-between rounded-2xl transition-colors min-w-0',
    isCompact ? 'px-4 py-3' : 'p-5 rounded-3xl',
    // PULLBACK NOTE: max-w caps button stretch on wide viewports
    // OLD: no max-width, buttons stretched full container
    // NEW: max-w-xs on default, uncapped on compact (footer column is narrow)
    !isCompact && 'max-w-xs'
  );

  return (
    <div
      className={cn(
        // PULLBACK NOTE: Responsive layout per breakpoint
        // OLD: always stacked (space-y-3)
        // NEW: stacked on mobile, side-by-side when container allows (sm in footer)
        isCompact
          ? 'grid grid-cols-2 gap-2'
          : 'flex flex-col gap-3',
        className
      )}
    >
      {/* iOS — App Store */}
      <a
        href={APP_DOWNLOAD_LINKS.IOS}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        className={cn(
          linkClass,
          platform === 'ios'
            ? 'bg-primary/10'
            : 'bg-secondary/20 hover:bg-secondary/40'
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <FaApple className={cn('flex-shrink-0 text-foreground/80', isCompact ? 'w-4 h-4' : 'w-5 h-5')} />
          <span className={cn('font-medium text-foreground/80 truncate', isCompact ? 'text-xs' : 'text-sm')}>
            {isCompact ? 'App Store' : 'App Store'}
          </span>
        </div>
        {!isCompact && (
          <span className="text-[11px] uppercase tracking-widest font-black text-primary flex-shrink-0 ml-3">
            Get
          </span>
        )}
      </a>

      {/* Android — Google Play */}
      <a
        href={APP_DOWNLOAD_LINKS.ANDROID}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get it on Google Play"
        className={cn(
          linkClass,
          platform === 'android'
            ? 'bg-primary/10'
            : 'bg-secondary/20 hover:bg-secondary/40'
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <FaGooglePlay className={cn('flex-shrink-0 text-foreground/80', isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4')} />
          <span className={cn('font-medium text-foreground/80 truncate', isCompact ? 'text-xs' : 'text-sm')}>
            {isCompact ? 'Google Play' : 'Google Play'}
          </span>
        </div>
        {!isCompact && (
          <span className="text-[11px] uppercase tracking-widest font-black text-primary flex-shrink-0 ml-3">
            Get
          </span>
        )}
      </a>
    </div>
  );
}
