import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/card';
import PasswordStrengthIndicator from '../components/password-strength-indicator';
import { setCurrentUser } from '../auth/auth-state';
import { useToast } from '../components/toast/toast-context';
import { processRequestError } from '../lib';
import { persistor } from '../api-store/store';
import { useRoleBasedAccess } from '../rbac/rbac-hook';
import { useSignupMutation } from '../auth/auth-slice';
import { CreateAccountFormData } from '../auth/auth-types';

const SignupScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const toast = useToast()
  const { hasPermission } = useRoleBasedAccess()

  const [signupHandler, { isLoading }] = useSignupMutation();
  const [formData, setFormData] = useState<CreateAccountFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasLetter: false
  });

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [passwordFieldFocused, setPasswordFieldFocused] = useState(false);

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.addEventListener('focus', () => setPasswordFieldFocused(true));
      passwordInputRef.current.addEventListener('blur', () => setPasswordFieldFocused(false));
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev: CreateAccountFormData) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength({
        hasMinLength: value.length >= 8,
        hasNumber: /\d/.test(value),
        hasSpecial: /[!@#$%^&*]/.test(value),
        hasLetter: /[a-zA-Z]/.test(value)
      });
    }
  };

  interface EmailSignupEvent extends React.FormEvent<HTMLFormElement> { }

  const handleEmailSignup = (e: EmailSignupEvent): void => {
    e.preventDefault();
    const { confirmPassword, ...payload } = formData;
    signupHandler(payload).unwrap().then((response) => {
      if (response?.data) {
        persistor.flush().then(() => {
          dispatch(setCurrentUser({
            ...response.data,
            token: response.token,
            isLoggedIn: true
          }));
          navigate('/author');
          toast?.open({
            message: response.message,
            variant: "success",
          });
        })
      }
    }).catch((e) => {
      toast?.open({
        message: processRequestError(e, 'Failed to sign up. Please try again later.'),
        variant: "destructive",
      });
    });
  };

  if (hasPermission('post.edit')) return <Navigate to='/posts' />;

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ref={passwordInputRef}
              />
              {passwordFieldFocused && (
                <div className="space-y-2 mt-2">
                  <PasswordStrengthIndicator
                    criteria="At least 8 characters"
                    met={passwordStrength.hasMinLength}
                  />
                  <PasswordStrengthIndicator
                    criteria="Contains a number"
                    met={passwordStrength.hasNumber}
                  />
                  <PasswordStrengthIndicator
                    criteria="Contains a special character"
                    met={passwordStrength.hasSpecial}
                  />
                  <PasswordStrengthIndicator
                    criteria="Contains a letter"
                    met={passwordStrength.hasLetter}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {formData.password && formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <div className="bg-red-50 text-red-700 border-red-200 p-2 rounded">
                  Passwords do not match
                </div>
              )}

            <button
              type="submit"
              disabled={isLoading ||
                !Object.values(passwordStrength).every(Boolean) ||
                formData.password !== formData.confirmPassword}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
            >
              <Mail className="w-5 h-5" />
              Create Account
            </button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600 text-center w-full">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupScreen;