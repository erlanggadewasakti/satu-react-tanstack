import { useEffect, useRef } from 'react';
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
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        navigate({
          to: '/login',
          state: (prev: any) => ({ ...prev, from: location.pathname }),
          replace: true
        });
      }
    } else if (isLoggedIn) {
      hasNavigated.current = false;
    }
  }, [isInitialized, isLoggedIn, navigate, location.pathname]);

  if (!isInitialized || !isLoggedIn) {
    return <Loader />;
  }

  return children;
}

