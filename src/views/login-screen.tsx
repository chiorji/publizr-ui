import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/card';
import { setIsAuthenticated, setCurrentUser, setToken } from '../user/user-state';
import { useLoginMutation } from '../user/user-slice';
import { persistor } from '../app/store';
import { processRequestError } from '../lib';
import { useToast } from '../components/toast/toast-context';
import { useRoleBasedAccess } from '../rbac/rbac-hook';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const [signInHandler, { isLoading, error }] = useLoginMutation();
  const { hasPermission } = useRoleBasedAccess()

  interface EmailLoginEvent extends React.FormEvent<HTMLFormElement> { }

  const handleEmailLogin = (e: EmailLoginEvent) => {
    e.preventDefault();
    signInHandler({ email, password }).unwrap().then((response) => {
      if (response?.data) {
        persistor.flush().then(() => {
          dispatch(setIsAuthenticated(true));
          dispatch(setCurrentUser(response.data));
          dispatch(setToken(response.token ?? ""));
          navigate('/author');
          toast?.open({
            message: response.message,
            variant: "success",
          });
        })
      }
    }).catch(() => {
      toast?.open({
        message: processRequestError(error),
        variant: "destructive",
      });
    });
  };

  if (hasPermission('post.edit')) return <Navigate to='/author' />;

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
                <Link to="/reset-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete='current-password'
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