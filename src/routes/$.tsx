import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));

export const Route = createFileRoute('/$')({
  component: MaintenanceError
});
