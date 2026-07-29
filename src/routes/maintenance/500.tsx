import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/error/500')));

export const Route = createFileRoute('/maintenance/500')({
  component: MaintenanceError500
});
