import { Outlet } from '@tanstack/react-router';

// project-imports
import ScrollTop from 'components/ScrollTop';
import GuestGuard from 'utils/route-guard/GuestGuard';

// ==============================|| LAYOUT - AUTH ||============================== //

export default function AuthLayout() {
  return (
    <GuestGuard>
      <ScrollTop>
        <Outlet />
      </ScrollTop>
    </GuestGuard>
  );
}
