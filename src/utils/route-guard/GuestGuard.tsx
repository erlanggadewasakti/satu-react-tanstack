import { useEffect } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';

// project-imports
import useAuth from 'hooks/useAuth';
import { getDefaultSubAppPath } from 'utils/auth';

// types
import { GuardProps } from 'types/auth';

// ==============================|| GUEST GUARD ||============================== //

export default function GuestGuard({ children }: GuardProps) {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      const fromPath = (location?.state as unknown as Record<string, string> | undefined)?.from;
      const isLoginPath = fromPath && (fromPath.includes('/login') || fromPath.includes('/auth'));
      const defaultPath = getDefaultSubAppPath(user);
      navigate({
        to: fromPath && !isLoginPath ? fromPath : defaultPath,
        replace: true
      });
    }
  }, [isLoggedIn, user, navigate, location?.state]);

  return children;
}
