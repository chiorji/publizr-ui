import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Github, Mail } from 'lucide-react';
import { setIsAuthenticated } from '../app/states/user-state';
import { useLoginMutation } from '../app/api/user-slice';
import { OAuthProvider } from '../types/user-types';
import { persistor } from '../app/store';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('user@domain.com');
  const [password, setPassword] = useState('password');
  const [signInHandler, { isLoading }] = useLoginMutation();

  const handleOAuthLogin = ({ provider }: OAuthProvider) => {
    console.log(`Logging in with ${provider}`);
  };

  interface EmailLoginEvent extends React.FormEvent<HTMLFormElement> { }

  const handleEmailLogin = (e: EmailLoginEvent) => {
    e.preventDefault();
    persistor.flush().then(() => {
      dispatch(setIsAuthenticated(true));
      navigate('/dashboard');
    })
    // signInHandler({ email, password }).then((response) => {
    //   if (response && response.data) {
    //     dispatch(setIsAuthenticated(true));
    //     navigate('/dashboard');
    //   }
    // }).catch((e) => {
    //   console.error('Failed to log in' + e);
    // });
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Choose your preferred login method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="space-y-2">
            <button
              onClick={() => handleOAuthLogin({ provider: 'google' })}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
            >
             <Mail className="w-5 h-5" />
              Continue with Google
            </button>

            <button
              onClick={() => handleOAuthLogin({ provider: 'github' })}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white rounded-lg px-4 py-2 hover:bg-gray-800 disabled:opacity-50"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
            >
              <Mail className="w-5 h-5" />
              Sign in with Email
            </button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600 text-center w-full">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginScreen;