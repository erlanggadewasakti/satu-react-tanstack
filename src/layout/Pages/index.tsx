import { Outlet } from '@tanstack/react-router';

// project-imports
import ScrollTop from 'components/ScrollTop';

// ==============================|| LAYOUT - BLANK PAGES ||============================== //

export default function PagesLayout() {
  return (
    <ScrollTop>
      <Outlet />
    </ScrollTop>
  );
}
