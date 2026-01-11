// src/pages/login.tsx (Login/Register Page)
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser, registerUser, resetAuthError } from '@/lib/slices/authSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AppDispatch, RootState } from '@/lib/store';
import SocialIcon from '@/components/ui/social-icons';


import { Card } from '@/components/ui/Card';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/emergency';  // Redirect after login
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Reset error on component unmount to prevent it from showing on subsequent renders
    return () => {
      dispatch(resetAuthError());
    };
  }, [dispatch]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (isLogin) {
      try {
        await dispatch(loginUser({ email, password })).unwrap();
        navigate(from, { replace: true }); // Redirect to the protected route or dashboard
      } catch (err) {
        // Handle login error (e.g., display error message)
        console.error('Login failed:', err);
      }
    } else {
      try {
        await dispatch(registerUser({ name, email, password })).unwrap();

        // You might want to automatically log in the user after successful registration:
        await dispatch(loginUser({ email, password })).unwrap();
        navigate(from, { replace: true });


      } catch (err) {
        // Handle registration error
        console.error('Registration failed:', err);
      }
    }
  };


  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center bg-transparent">
      {/* Toggle between Login and Register */}

      <Card className="w-full max-w-md p-10 rounded-3xl border-border bg-card">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground tracking-tight">
          {isLogin ? 'Access Command' : 'Register Officer'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground ml-1">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-background border-border rounded-xl text-foreground"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background border-border rounded-xl text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs uppercase tracking-widest text-muted-foreground ml-1">Key Phrase</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background border-border rounded-xl text-foreground"
            />
          </div>
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="rounded-xl border-destructive/50 bg-destructive/10">
              <AlertDescription className="text-xs uppercase tracking-wider">{error}</AlertDescription>
            </Alert>
          )}
          <Button variant='accent' type="submit" disabled={loading} className='w-full py-7 rounded-xl font-bold uppercase tracking-widest'>
            {loading ? 'Authenticating...' : isLogin ? 'Initialize' : 'Create Profile'}
          </Button>
        </form>

        <div className="mt-8 flex items-center justify-center space-x-6 text-muted-foreground">
          {['google', 'apple', 'facebook', 'twitter'].map((provider) => (
            <SocialIcon
              key={provider}
              provider={provider as any} // Type assertion if needed
              onClick={() => console.log(`${provider} clicked`)}
              className="hover:text-foreground transition-colors"
            />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              New to Command?{' '}
              <Link to="/login" onClick={() => setIsLogin(false)} className="font-bold text-accent hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              Already registered?{' '}
              <Link to="/login" onClick={() => setIsLogin(true)} className="font-bold text-accent hover:underline">
                Login
              </Link>
            </>
          )}
        </p>
      </Card>
    </div>
  );
};


export default Login;
