import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';

// project-imports
import Loader from 'components/Loader';
import useAuth from 'hooks/useAuth';
import { getDefaultSubAppPath, stripBasepath } from 'utils/auth';

// types
import { GuardProps } from 'types/auth';

// Helper to ensure target path is strictly internal to prevent Open Redirect
const isValidInternalPath = (path?: string): boolean => {
  if (!path || typeof path !== 'string') return false;
  return path.startsWith('/') && !path.startsWith('//') && !path.includes('\\');
};

// ==============================|| GUEST GUARD ||============================== //

export default function GuestGuard({ children }: GuardProps) {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    if (!isLoggedIn) {
      hasNavigatedRef.current = false;
      return;
    }

    if (!hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      const fromPath = (location?.state as unknown as Record<string, string> | undefined)?.from;
      const isLoginPath = fromPath && (fromPath.includes('/login') || fromPath.includes('/auth'));
      const defaultPath = getDefaultSubAppPath(user);
      const rawTarget = isValidInternalPath(fromPath) && !isLoginPath ? fromPath! : defaultPath;
      const targetPath = stripBasepath(rawTarget);

      navigate({
        to: targetPath,
        replace: true
      });
    }
  }, [isLoggedIn, user, navigate, location?.state]);

  if (isLoggedIn) {
    return <Loader />;
  }

  return children;
}
