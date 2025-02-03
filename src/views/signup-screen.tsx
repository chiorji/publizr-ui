import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Github, Mail } from 'lucide-react';
import PasswordStrengthIndicator from '../components/ui/password-strength-indicator';
import { CreateAccountFormData } from '../types/user-types';
import { useSignupMutation } from '../app/api/user-slice';
import { OAuthProvider } from '../types/user-types';

const SignupScreen = () => {
  const navigate = useNavigate();
  const [signupHandler, { isLoading }] = useSignupMutation();
  const [formData, setFormData] = useState<CreateAccountFormData>({
    fullName: 'Orji Chigbogu',
    email: 'bright@user.com',
    password: '@12Password',
    confirmPassword: '@12Password',
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
    signupHandler(payload).then((response) => {
      if (response && response.data) {
        navigate('/dashboard');
        console.log('User created successfully');
      }
    }).catch((e) => {
      console.error('Failed to sign up' + e);
    });
  };


  const handleOAuthSignup = (provider: OAuthProvider['provider']): void => {
    console.log(`Signing up with ${provider}`);
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Choose your preferred signup method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="space-y-2">
            <button
              onClick={() => handleOAuthSignup('google')}
              disabled
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
            >
              <Mail className="w-5 h-5" />
              Sign up with Google
            </button>

            <button
              onClick={() => handleOAuthSignup('github')}
              disabled
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white rounded-lg px-4 py-2 hover:bg-gray-800 disabled:opacity-50"
            >
              <Github className="w-5 h-5" />
              Sign up with GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
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