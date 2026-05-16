import { Apple, Smartphone } from 'lucide-react';
import { getClientPlatform, APP_DOWNLOAD_LINKS } from '@/constants/appLinks';
import { cn } from '@/lib/utils';

interface StoreLinksProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function StoreLinks({ className, variant = 'default' }: StoreLinksProps) {
  const platform = getClientPlatform();
  const isCompact = variant === 'compact';

  return (
    <div className={cn('space-y-3', className)}>
      {/* iOS */}
      <a
        href={APP_DOWNLOAD_LINKS.IOS}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex items-center justify-between rounded-2xl transition-colors',
          isCompact ? 'px-4 py-3' : 'p-6 rounded-3xl',
          platform === 'ios'
            ? 'bg-primary/10'
            : 'bg-secondary/20 hover:bg-secondary/40'
        )}
      >
        <div className="flex items-center gap-3">
          <Apple className={cn('text-foreground/70', isCompact ? 'w-4 h-4' : 'w-5 h-5')} />
          <div className="flex flex-col">
            <span className={cn('font-medium text-foreground/80', isCompact ? 'text-xs' : 'text-sm')}>
              App Store
            </span>
            {!isCompact && (
              <span className="text-[11px] text-muted-foreground/50">iPhone & iPad</span>
            )}
          </div>
        </div>
        <span className={cn(
          'uppercase tracking-widest font-black text-primary',
          isCompact ? 'text-[10px]' : 'text-[11px]'
        )}>
          Get
        </span>
      </a>

      {/* Android */}
      <a
        href={APP_DOWNLOAD_LINKS.ANDROID}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex items-center justify-between rounded-2xl transition-colors',
          isCompact ? 'px-4 py-3' : 'p-6 rounded-3xl',
          platform === 'android'
            ? 'bg-primary/10'
            : 'bg-secondary/20 hover:bg-secondary/40'
        )}
      >
        <div className="flex items-center gap-3">
          <Smartphone className={cn('text-foreground/70', isCompact ? 'w-4 h-4' : 'w-5 h-5')} />
          <div className="flex flex-col">
            <span className={cn('font-medium text-foreground/80', isCompact ? 'text-xs' : 'text-sm')}>
              Google Play
            </span>
            {!isCompact && (
              <span className="text-[11px] text-muted-foreground/50">Android</span>
            )}
          </div>
        </div>
        <span className={cn(
          'uppercase tracking-widest font-black text-primary',
          isCompact ? 'text-[10px]' : 'text-[11px]'
        )}>
          Get
        </span>
      </a>
    </div>
  );
}
