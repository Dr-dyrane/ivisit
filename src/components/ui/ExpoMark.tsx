import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeContext';

interface ExpoMarkProps {
  className?: string;
  iconClassName?: string;
  tone?: 'auto' | 'light' | 'dark';
}

export default function ExpoMark({ className, iconClassName, tone = 'auto' }: ExpoMarkProps) {
  const { theme } = useTheme();
  const resolvedTone =
    tone === 'auto' ? (theme === 'dark' ? 'light' : 'dark') : tone;
  const logoSrc =
    resolvedTone === 'light'
      ? '/expo/logos-main/png/logo-type-a-light.png'
      : '/expo/logos-main/png/logo-type-a.png';

  return (
    <span
      className={cn('inline-flex items-center justify-center', className)}
      aria-hidden="true"
    >
      <img
        src={logoSrc}
        alt=""
        className={cn('h-full w-auto object-contain', iconClassName)}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
