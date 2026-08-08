import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const SuperAdminHomePage = Loadable(lazy(() => import('pages/super-admin/home')));

export const Route = createFileRoute('/_dashboard/super-admin/home')({
  component: SuperAdminHomePage
});
