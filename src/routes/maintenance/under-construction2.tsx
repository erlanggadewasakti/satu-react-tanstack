import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const MaintenanceUnderConstruction2 = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction2')));

export const Route = createFileRoute('/maintenance/under-construction2')({
  component: MaintenanceUnderConstruction2
});
