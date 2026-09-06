import { useEffect } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';

// project-imports
import useAuth from 'hooks/useAuth';
import Loader from 'components/Loader';

// types
import { GuardProps } from 'types/auth';

// ==============================|| AUTH GUARD ||============================== //

export default function AuthGuard({ children }: GuardProps) {
  const { isLoggedIn, isInitialized } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      navigate({
        to: '/login',
        state: (prev: any) => ({ ...prev, from: location.pathname }),
        replace: true
      });
    }
  }, [isInitialized, isLoggedIn, navigate, location.pathname]);

  if (!isInitialized || !isLoggedIn) {
    return <Loader />;
  }

  return children;
}
