import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon')));

export const Route = createFileRoute('/maintenance/coming-soon')({
  component: MaintenanceComingSoon
});
