// src/pages/login.tsx (Login/Register Page)
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser, registerUser } from '@/lib/slices/authSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { RootState } from '@/lib/store';


const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/emergency';  // Redirect after login
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        if (error) {
            // You can add more sophisticated error handling here, like showing specific error messages.
            alert(error);
        }
    }, [error]);


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
                <h2 className="text-2xl font-bold text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
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
                    <Button variant='accent' type="submit" disabled={loading} className='w-full rounded-lg'>
                        {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
                    </Button>
                </form>
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
