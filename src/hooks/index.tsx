import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';

export const AUTH_PATHS = [
  '/dashboard',
  '/posts'
];

export const useRedirect = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.users);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !AUTH_PATHS.includes(location.pathname)) {
      navigate(-1);
    }
  }, [location.pathname]);
};