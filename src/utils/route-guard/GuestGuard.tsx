import { useEffect } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';

// project-imports
import { APP_DEFAULT_PATH } from 'config';
import useAuth from 'hooks/useAuth';

// types
import { GuardProps } from 'types/auth';

// ==============================|| GUEST GUARD ||============================== //

export default function GuestGuard({ children }: GuardProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      const fromPath = (location?.state as unknown as Record<string, string> | undefined)?.from;
      const isLoginPath = fromPath && (fromPath.includes('/login') || fromPath.includes('/auth'));
      navigate({
        to: fromPath && !isLoginPath ? fromPath : APP_DEFAULT_PATH,
        replace: true
      });
    }
  }, [isLoggedIn, navigate, location?.state]);

  return children;
}
