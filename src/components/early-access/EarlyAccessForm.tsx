import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { submitSubscriber } from '@/lib/api/subscribers';

interface EarlyAccessFormProps {
  onSuccess?: () => void;
  variant?: 'default' | 'compact';
}

export default function EarlyAccessForm({ onSuccess, variant = 'default' }: EarlyAccessFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    const result = await submitSubscriber(email, 'free');

    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      setEmail('');
      onSuccess?.();
    } else {
      setStatus('error');
      setMessage(result.error || 'Something went wrong');
    }

    setLoading(false);
  };

  const handlePaymentRedirect = () => {
    const gumroadLink = import.meta.env.VITE_GUMROAD_LINK;
    if (gumroadLink && gumroadLink !== 'https://gumroad.com/l/your-product-id') {
      window.open(gumroadLink, '_blank');
    }
  };

  if (variant === 'compact') {
    return (
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || status === 'success'}
            className="flex-1 px-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
          <Button
            type="submit"
            variant="accent"
            size="sm"
            disabled={loading || status === 'success'}
            className="px-6"
          >
            {loading ? 'Subscribing...' : 'Join'}
          </Button>
        </form>

        {status === 'success' && (
          <div className="mt-3 flex items-center gap-2 text-green-500 text-sm">
            <CheckCircle2 className="h-4 w-4" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-3 flex items-start gap-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-0 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Mail className="h-5 w-5" />
          </div>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || status === 'success'}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
        </div>

        {status !== 'success' && (
          <Button
            type="submit"
            variant="accent"
            size="lg"
            disabled={loading}
            className="w-full rounded-xl"
          >
            {loading ? 'Subscribing...' : 'Get Free Early Access'}
          </Button>
        )}
        {status === 'success' && (
          <Button
            type="button"
            variant="accent"
            size="lg"
            onClick={handlePaymentRedirect}
            className="w-full rounded-xl"
          >
            Support the Project
          </Button>
        )}
      </form>

      {status === 'success' && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-green-500/10 border border-green-500/20 flex gap-3 sm:gap-4">
          <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-green-500 mb-2">Subscription Confirmed!</p>
            <p className="text-xs sm:text-sm text-muted-foreground break-words">{message}</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Want to support the project? Click the button above to become a paid supporter and unlock premium features.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-destructive/10 border border-destructive/20 flex gap-3 sm:gap-4">
          <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-destructive mb-2">Subscription Failed</p>
            <p className="text-xs sm:text-sm text-muted-foreground break-words">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
