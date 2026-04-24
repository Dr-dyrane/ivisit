import React, { useState, useRef } from 'react';
import { Mail, CheckCircle2, AlertCircle, X, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { submitSubscriber } from '@/lib/api/subscribers';
import { toast } from 'sonner';

interface EarlyAccessFormProps {
  onSuccess?: () => void;
  variant?: 'default' | 'compact';
}

export default function EarlyAccessForm({ onSuccess, variant = 'default' }: EarlyAccessFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [closedTesting, setClosedTesting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    const result = await submitSubscriber(
      email, 
      'free', 
      closedTesting ? 'google_play_closed_testing' : undefined
    );

    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      setEmail('');
      onSuccess?.();
      toast.success('Successfully subscribed!');
    } else {
      setStatus('error');
      setMessage(result.error || 'Something went wrong');
      toast.error(result.error || 'Something went wrong');
    }

    setLoading(false);
  };

  const clearInput = () => {
    setEmail('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (variant === 'compact') {
    return (
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            id="email-compact"
            name="email"
            autoComplete="email"
            placeholder="Email for updates"
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
            className="w-full px-6 sm:w-auto"
          >
            {loading ? '...' : 'Get updates'}
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
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Apple-style Input with Focus Effect */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-200" style={{
            transform: `translateY(-50%) scale(${isFocused ? 1.1 : 1})`,
            opacity: isFocused ? 0.8 : 1
          }}>
            <Mail className="h-5 w-5" />
          </div>
          
          <input
            ref={inputRef}
            type="email"
            id="email-early-access"
            name="email"
            autoComplete="email"
            placeholder="Enter your email for early access..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={loading || status === 'success'}
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background focus:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
          
          {/* Clear Button */}
          {email && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Closed Testing Opt-in */}
        <div 
          className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
            closedTesting 
              ? 'bg-primary/10' 
              : 'bg-secondary/40 hover:bg-secondary/60'
          }`}
          onClick={() => setClosedTesting(!closedTesting)}
        >
          <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 ${
            closedTesting ? 'bg-primary' : 'bg-background'
          }`}>
            {closedTesting && <CheckCircle2 className="h-3 w-3 text-white" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground leading-none mb-1">Google Play Closed Testing</p>
            <p className="text-[11px] text-muted-foreground/60">I want to be among the first 12 Android testers.</p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={loading || status === 'success'}
          className="w-full rounded-2xl text-base font-bold transition-all duration-200 hover:scale-[1.02] group"
        >
          <span>{loading ? 'Subscribing...' : 'Get Early Access'}</span>
          <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>

        {status === 'success' && (
          <div className="mt-4 flex items-center gap-2 text-green-500 text-sm">
            <CheckCircle2 className="h-4 w-4" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-4 flex items-start gap-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
}
