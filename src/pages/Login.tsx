import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '@/lib/slices/authSlice';

import { Input } from '@/components/ui/input';
import { AppDispatch } from '@/lib/store';
import { Button } from '@/components/ui/Button';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen justify-center items-center flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <Input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <Input type="password" id="password" name="password" required />
        </div>
        <Button variant='outline' className='text-foreground' type="submit">Log In</Button>
      </form>
    </div>
  );
};

export default Login;

