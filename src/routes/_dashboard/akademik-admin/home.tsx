import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const AkademikAdminHomePage = Loadable(lazy(() => import('pages/akademik-admin/home')));

export const Route = createFileRoute('/_dashboard/akademik-admin/home')({
  component: AkademikAdminHomePage
});
