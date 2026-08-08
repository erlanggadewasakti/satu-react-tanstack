import { ReactElement } from 'react';
import { useLocation } from '@tanstack/react-router';

// project-imports
import useAuth from 'hooks/useAuth';
import { SUB_APPS } from 'config/subApps';
import { hasRoleAccess } from 'utils/auth';
import { Error404 } from 'components/maintenance';

// types
import { GuardProps } from 'types/auth';

// ==============================|| SUB-APP ROUTE GUARD ||============================== //

export default function SubAppGuard({ children }: GuardProps): ReactElement | null {
  const { user } = useAuth();
  const location = useLocation();

  // Cari sub-app yang cocok dengan URL prefix saat ini
  const matchedApp = SUB_APPS.find((app) => location.pathname.startsWith(app.prefix));

  // Jika mencoba mengakses rute sub-app yang TIDAK diizinkan untuk role user -> Tampilkan 404
  if (matchedApp && !hasRoleAccess(user, matchedApp.allowedRoles)) {
    return <Error404 />;
  }

  return children;
}
