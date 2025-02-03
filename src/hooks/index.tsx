import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';

export const WHITELISTED_AFTER_AUTHENTICATION = [
  '/dashboard'
];

export const BLACKLISTED_AFTER_AUTHENTICATION = [
  '/login',
  '/signup',
]

export const useRedirectIfRequireAuth = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.users);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    if (
      (isAuthenticated && BLACKLISTED_AFTER_AUTHENTICATION.includes(location.pathname))
      || (!isAuthenticated && WHITELISTED_AFTER_AUTHENTICATION.includes(location.pathname))
    ) {
      navigate(-1);
    }
  }, [location.pathname]);
};