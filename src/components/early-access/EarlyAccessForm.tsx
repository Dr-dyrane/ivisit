import React, { useState, useRef } from 'react';
import { Mail, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { Button } from '../ui/Button';
import { submitSubscriber, signInWithGoogleForEarlyAccess } from '@/lib/api/subscribers';
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
  const inputRef = useRef<HTMLInputElement>(null);

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
      toast.success('Successfully subscribed!');
    } else {
      setStatus('error');
      setMessage(result.error || 'Something went wrong');
      toast.error(result.error || 'Something went wrong');
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogleForEarlyAccess();
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      toast.error('Google Sign-In failed. Please try again.');
      setLoading(false);
    }
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
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            id="email-compact"
            name="email"
            autoComplete="email"
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
            {loading ? '...' : 'Join'}
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

        {/* Submit Button with Google Icon */}
        <div className="flex gap-3">
          <Button
            type="submit"
            variant="accent"
            size="lg"
            disabled={loading || status === 'success'}
            className="flex-1 rounded-2xl text-base font-bold transition-all duration-200 hover:scale-[1.02]"
          >
            {loading ? 'Subscribing...' : 'Get Early Access'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            size="lg"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="w-14 h-14 rounded-2xl border-border/50 bg-background/50 hover:bg-background flex items-center justify-center transition-all duration-200 hover:scale-110 group"
          >
            <FaGoogle className="h-5 w-5 text-red-500 group-hover:animate-pulse" />
          </Button>
        </div>

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
