import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction')));

export const Route = createFileRoute('/maintenance/under-construction')({
  component: MaintenanceUnderConstruction
});
