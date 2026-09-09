import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';

// project-imports
import Loader from 'components/Loader';
import useAuth from 'hooks/useAuth';

// types
import { GuardProps } from 'types/auth';

// Helper to ensure target path is strictly internal to prevent Open Redirect
const isValidInternalPath = (path?: string): boolean => {
  if (!path || typeof path !== 'string') return false;
  return path.startsWith('/') && !path.startsWith('//') && !path.includes('\\');
};

/**
 * Normalizes redirect paths to prevent redirect loops and strip basepath prefixes if present
 */
const normalizeRedirectPath = (path?: string, basePath = import.meta.env.BASE_URL): string => {
  if (!isValidInternalPath(path)) return '/home';

  let cleanPath = path!.replace(/\\/g, '/').replace(/\/+/g, '/');

  // Strip basepath if fromPath includes it (e.g. '/lens/home' -> '/home', or '/lens' -> '/')
  const normalizedBase = basePath === '/' ? '' : basePath.replace(/^\/+|\/+$/g, '');
  if (normalizedBase) {
    const baseWithLeadingSlash = `/${normalizedBase}`;
    if (cleanPath === baseWithLeadingSlash) {
      cleanPath = '/';
    } else if (cleanPath.startsWith(`${baseWithLeadingSlash}/`)) {
      cleanPath = cleanPath.slice(baseWithLeadingSlash.length);
    }
  }

  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }

  if (cleanPath.includes('/login') || cleanPath.includes('/auth') || cleanPath === '/') {
    return '/home';
  }

  return cleanPath;
};

// ==============================|| GUEST GUARD ||============================== //

export default function GuestGuard({ children }: GuardProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hasNavigated = useRef(false);

  // Extract primitive string to avoid object reference instability in useEffect
  const rawFromPath = (location?.state as unknown as Record<string, string> | undefined)?.from;

  useEffect(() => {
    if (isLoggedIn) {
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        const targetPath = normalizeRedirectPath(rawFromPath);
        navigate({
          to: targetPath as any,
          replace: true
        });
      }
    } else {
      hasNavigated.current = false;
    }
  }, [isLoggedIn, rawFromPath, navigate]);

  if (isLoggedIn) {
    return <Loader />;
  }

  return children;
}

