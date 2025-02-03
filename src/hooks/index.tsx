import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';

export const REQUIRE_AUTH_PATHS = [
  '/dashboard'
];

export const useRedirect = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.users);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    if ((isAuthenticated && !REQUIRE_AUTH_PATHS.includes(location.pathname)) || (!isAuthenticated && REQUIRE_AUTH_PATHS.includes(location.pathname))) {
      navigate(-1);
    }
  }, [location.pathname]);
};