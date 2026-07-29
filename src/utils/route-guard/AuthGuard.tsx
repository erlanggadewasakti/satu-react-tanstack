import { useEffect } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';

// project-imports
import useAuth from 'hooks/useAuth';

// types
import { GuardProps } from 'types/auth';

// ==============================|| AUTH GUARD ||============================== //

export default function AuthGuard({ children }: GuardProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({
        to: '/login',
        state: (prev: any) => ({ ...prev, from: location.pathname }),
        replace: true
      });
    }
  }, [isLoggedIn, navigate, location.pathname]);

  return children;
}
