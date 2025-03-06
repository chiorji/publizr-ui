import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';

export const WHITELISTED_AFTER_AUTHENTICATION = [
  '/dashboard',
  '/admin'
];

export const BLACKLISTED_AFTER_AUTHENTICATION = [
  '/login',
  '/signup',
]

export const useRedirectIfRequireAuth = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.userSlice);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  useEffect(() => {

    if (
      (isAuthenticated && BLACKLISTED_AFTER_AUTHENTICATION.includes(pathname))
      || (!isAuthenticated && WHITELISTED_AFTER_AUTHENTICATION.includes(pathname))
    ) {
      navigate(-1);
    }

    if (isAdmin && !/admin/i.test(pathname)) {
      navigate('/admin');
    }
  }, [location.pathname]);
};

export const useIsAdmin = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.userSlice);
  if (!(isAuthenticated && /admin/i.test(user.role))) return false;
  return true;
}