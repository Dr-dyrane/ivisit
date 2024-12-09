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
    <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center">
      {/* Toggle between Login and Register */}


      <div className={cn("w-full max-w-md bg-background rounded-lg p-8 shadow-md", isLogin && "border border-foreground/20")}>



        <h2 className="text-2xl font-bold text-center mb-4">{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button variant='accent' type="submit" disabled={loading} className='w-full rounded-lg'>
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
          </Button>
        </form>
        <div className="mt-4 flex items-center justify-center space-x-4 text-white">
          {['google', 'apple', 'facebook', 'twitter'].map((provider) => (
            <SocialIcon
              key={provider}
              provider={provider as any} // Type assertion if needed
              onClick={() => console.log(`${provider} clicked`)}
            />
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <Link to="/login" onClick={() => setIsLogin(false)} className="font-medium text-accent-foreground hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/login" onClick={() => setIsLogin(true)} className="font-medium text-accent-foreground hover:underline">
                Login
              </Link>
            </>
          )}
        </p>
      </div>

    </div>
  );
};


export default Login;
