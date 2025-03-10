import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/card"
import { TextInput } from "../components/input";
import PasswordStrengthIndicator from "../components/password-strength-indicator";
import { isValidEmail, processRequestError } from "../lib";
import { useToast } from "../components/toast/toast-context";
import { useRoleBasedAccess } from "../rbac/rbac-hook";
import { useResetPasswordMutation } from "../auth/auth-slice";

export const ResetPassword: React.FC = () => {
  const toast = useToast()
  const navigate = useNavigate();
  const { hasPermission } = useRoleBasedAccess()
  const [resetHandler, { isLoading }] = useResetPasswordMutation();
  const [{ email, password, confirmPassword }, setState] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

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
    setState((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength({
        hasMinLength: value.length >= 8,
        hasNumber: /\d/.test(value),
        hasSpecial: /[!@#$%^&*]/.test(value),
        hasLetter: /[a-zA-Z]/.test(value)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(email)) return false;
    resetHandler({ email, password }).unwrap().then((response) => {
      if (response) {
        navigate('/login');
        toast?.open({
          message: 'Password reset successfully',
          variant: "success",
        });
      } else {
        toast?.open({
          message: 'Password reset not successfully',
          variant: "warning",
        });
      }
    }).catch((e) => {
      toast?.open({
        message: processRequestError(e, 'Password reset failed.'),
        variant: "destructive",
      });
    });
  }

  if (hasPermission('post.edit')) return <Navigate to='/posts' />;

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>Provide your email and password to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput
              label='Email'
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <TextInput
              required
              label='New password'
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleInputChange}
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
            <TextInput
              label='Confirm New password'
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleInputChange}
              autoComplete="false"
            />
            {password && confirmPassword &&
              password !== confirmPassword && (
                <div className="bg-red-50 text-red-700 border-red-200 p-2 rounded">
                  Passwords do not match
                </div>
              )}

            <button
              type="submit"
              disabled={isLoading ||
                !Object.values(passwordStrength).every(Boolean)
                || password !== confirmPassword
                || !isValidEmail(email)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
            >
              Continue
            </button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600 text-center w-full">
            Remembered password?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}