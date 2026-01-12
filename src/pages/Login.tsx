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

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/emergency';
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { theme } = useTheme();
  
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          <span className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-foreground">Secure Connection</span>
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
          <span className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-foreground">Encrypted</span>
        </div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
          SECURE PROTOCOL<br />
          ACTIVE
        </p>
      </div>

      <Card className="relative z-10 w-full max-w-md p-6 sm:p-8 md:p-10 rounded-[2.5rem] sm:rounded-[3rem] border-border/50 bg-background/40 backdrop-blur-3xl shadow-2xl overflow-hidden">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-primary/20 rounded-tl-[3rem]" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-primary/20 rounded-br-[3rem]" />
        
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            {isLogin ? <Lock className="w-6 h-6 text-primary" /> : <User className="w-6 h-6 text-primary" />}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-2">
            {isLogin ? 'Log In' : 'Create Account'}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Activity className="w-3 h-3 text-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-[0.1em]">Secure Access</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs sm:text-sm font-semibold text-foreground ml-1">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-secondary/50 border-border rounded-xl h-11 sm:h-12 text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-md"
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs sm:text-sm font-semibold text-foreground ml-1">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-secondary/50 border-border rounded-xl h-11 sm:h-12 text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-md"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs sm:text-sm font-semibold text-foreground ml-1">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-secondary/50 border-border rounded-xl h-11 sm:h-12 text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-md"
              placeholder="Enter a secure password"
            />
          </div>

          {error && (
            <Alert variant="destructive" className="rounded-xl border-primary/50 bg-primary/10">
              <AlertDescription className="text-xs sm:text-sm font-semibold text-primary text-center">
                Access Denied: {error}
              </AlertDescription>
            </Alert>
          )}

          <Button 
            variant='accent' 
            type="submit" 
            disabled={loading} 
            showOverlay={true}
            className='w-full h-12 sm:h-13 rounded-xl font-bold tracking-[0.1em] shadow-lg shadow-primary/20 text-sm sm:text-base'
          >
            {loading ? 'Signing in...' : isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-8 sm:mt-10">
          <div className="relative mb-6 sm:mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-xs font-semibold uppercase tracking-wider">
              <span className="bg-background/40 px-3 sm:px-4 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4 sm:space-x-6">
            {(['google', 'apple', 'facebook', 'twitter'] as const).map((provider) => (
              <SocialIcon
                key={provider}
                provider={provider}
                onClick={() => console.log(`${provider} clicked`)}
                className="hover:text-primary transition-all hover:scale-110 w-6 h-6 sm:w-7 sm:h-7"
              />
            ))}
          </div>
        </div>

        <p className="mt-8 sm:mt-10 text-center text-xs sm:text-sm font-medium text-muted-foreground">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button onClick={() => setIsLogin(false)} className="text-primary font-semibold hover:underline">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)} className="text-primary font-semibold hover:underline">
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
