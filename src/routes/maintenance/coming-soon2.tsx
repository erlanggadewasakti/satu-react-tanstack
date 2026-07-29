import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const MaintenanceComingSoon2 = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon2')));

export const Route = createFileRoute('/maintenance/coming-soon2')({
  component: MaintenanceComingSoon2
});
