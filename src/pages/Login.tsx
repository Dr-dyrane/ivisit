import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, registerUser, resetAuthError } from '@/lib/slices/authSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { AppDispatch, RootState } from '@/lib/store';
import SocialIcon from '@/components/ui/social-icons';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/providers/ThemeContext';
import { ShieldCheck, Lock, User, Satellite, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/emergency';
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { theme } = useTheme();
  const { signInWithOAuth } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      dispatch(resetAuthError());
    };
  }, [dispatch]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithOAuth('google');

      if (!result.success) {
        if (result.error?.includes('popup')) {
          alert('Please allow popups for this site to use Google login');
        } else {
          alert(`Google login failed: ${result.error}`);
        }
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert('Google login failed. Please try again.');
    }
  };

  const handleAppleLogin = async () => {
    try {
      const result = await signInWithOAuth('apple');

      if (!result.success) {
        alert('Apple login is not available in this browser');
      }
    } catch (error) {
      console.error('Apple login error:', error);
      alert('Apple login failed. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      try {
        await dispatch(loginUser({ email, password })).unwrap();
        navigate(from, { replace: true });
      } catch (err) {
        console.error('Login failed:', err);
      }
    } else {
      try {
        await dispatch(registerUser({ name, email, password })).unwrap();
        await dispatch(loginUser({ email, password })).unwrap();
        navigate(from, { replace: true });
      } catch (err) {
        console.error('Registration failed:', err);
      }
    }
  };

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden group py-12 sm:py-24">
      {/* Smarty Blur Background */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 800px at ${mousePos.x}px ${mousePos.y}px, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(var(--grid-color), 0.05)'}, transparent 80%)`,
        }}
      />

      {/* Tactical HUD Overlays for Background */}
      <div className="absolute top-24 left-12 p-6 rounded-2xl bg-black/5 border border-border/50 hidden lg:block pointer-events-none">
        <div className="flex items-center gap-3 mb-4">
          <Satellite className="w-5 h-5 text-primary" />
          <span className="text-xs sm:text-sm font-light uppercase tracking-[0.15em] text-foreground">Secure Connection</span>
        </div>
        <div className="space-y-2">
          <div className="h-1 w-32 bg-border/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-2/3 animate-pulse" />
          </div>
          <div className="h-1 w-24 bg-border/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 right-12 p-6 rounded-2xl bg-black/5 border border-border/50 hidden lg:block pointer-events-none">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="text-xs sm:text-sm font-light uppercase tracking-[0.15em] text-foreground">Encrypted</span>
        </div>
        <p className="text-xs font-light text-muted-foreground uppercase tracking-wider leading-relaxed">
          SECURE PROTOCOL<br />
          ACTIVE
        </p>
      </div>

      <Card className="relative z-10 w-full max-w-md p-8 sm:p-10 md:p-12 rounded-[2.5rem] sm:rounded-[3rem] border-border/50 bg-background/40 backdrop-blur-3xl shadow-2xl overflow-hidden">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-primary/20 rounded-tl-[3rem]" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-primary/20 rounded-br-[3rem]" />

        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
            {isLogin ? <Lock className="w-6 h-6 text-primary" /> : <User className="w-6 h-6 text-primary" />}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.06em] text-foreground mb-4 leading-[0.8]">
            {isLogin ? 'Log In' : 'Create Account'}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Activity className="w-3 h-3 text-primary animate-pulse" />
            <a
              href="https://expo.dev/preview/update?message=modified%3A+++services%2FinsuranceService.js&updateRuntimeVersion=1.0.0&createdAt=2026-01-20T19%3A56%3A27.878Z&slug=exp&projectId=a3777b70-b973-4b3b-ba59-ed32bf5662e0&group=929eee2a-83cd-497e-8f88-c42c58648467"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light text-muted-foreground uppercase tracking-[0.15em] hover:text-primary transition-colors cursor-pointer"
            >
              Instant Demo Access
            </a>
          </div>
        </div>

        {/* Priority Social Login - Matching Native App */}
        <div className="mb-12">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              className="h-14 rounded-2xl border-border/50 bg-background/50 hover:bg-background flex items-center justify-center gap-3 font-black tracking-[0.15em] transition-all hover:scale-105 active:scale-95"
            >
              <SocialIcon provider="google" onClick={() => { }} className="w-5 h-5 !p-0 !bg-transparent !text-inherit" />
              <span className="text-sm">Google</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleAppleLogin}
              className="h-14 rounded-2xl border-border/50 bg-background/50 hover:bg-background flex items-center justify-center gap-3 font-black tracking-[0.15em] transition-all hover:scale-105 active:scale-95"
            >
              <SocialIcon provider="apple" onClick={() => { }} className="w-5 h-5 !p-0 !bg-transparent !text-inherit" />
              <span className="text-sm">Apple</span>
            </Button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-xs font-light uppercase tracking-[0.2em]">
              <span className="bg-background/40 px-4 text-muted-foreground">Or use email</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-light uppercase tracking-[0.15em] text-primary ml-2">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-secondary/50 border-border rounded-xl h-12 text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-md"
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div className="space-y-3">
            <Label htmlFor="email" className="text-sm font-light uppercase tracking-[0.15em] text-primary ml-2">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-secondary/50 border-border rounded-xl h-12 text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-md"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password" className="text-sm font-light uppercase tracking-[0.15em] text-primary ml-2">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-secondary/50 border-border rounded-xl h-12 text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-md"
              placeholder="Enter a secure password"
            />
          </div>

          {error && (
            <Alert variant="destructive" className="rounded-xl border-primary/50 bg-primary/10">
              <AlertDescription className="text-sm font-light text-primary text-center">
                Access Denied: {error}
              </AlertDescription>
            </Alert>
          )}

          <Button
            variant='accent'
            type="submit"
            disabled={loading}
            showOverlay={true}
            className='w-full h-14 rounded-2xl font-black tracking-[0.2em] shadow-lg shadow-primary/20 text-base transition-all hover:scale-105 active:scale-95'
          >
            {loading ? 'Signing in...' : isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Legal Links - App Store Compliance */}
        <div className="mt-8 space-y-2 text-center">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              By continuing, you agree to our{" "}
              <a href="/terms" className="text-primary font-black hover:underline transition-colors">
                Terms
              </a>
              ,{" "}
              <a href="/privacy" className="text-primary font-black hover:underline transition-colors">
                Privacy
              </a>
              ,{" "}
              <a href="/medical-disclaimer" className="text-primary font-black hover:underline transition-colors">
                Medical Disclaimer
              </a>
              , &{" "}
              <a href="/health-data-consent" className="text-primary font-black hover:underline transition-colors">
                Health Data Consent
              </a>
            </p>
            <p>
              We require{" "}
              <span className="text-primary font-black">
                Location Access
              </span>{" "}
              for dispatch.
            </p>
          </div>
        </div>

        <p className="mt-12 text-center text-sm font-light text-muted-foreground">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button onClick={() => setIsLogin(false)} className="text-primary font-black hover:underline transition-colors">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)} className="text-primary font-black hover:underline transition-colors">
                Sign in
              </button>
            </>
          )}
        </p>
      </Card>
    </div>
  );
};

export default Login;
