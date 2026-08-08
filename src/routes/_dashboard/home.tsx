import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const UniversalHomePage = Loadable(lazy(() => import('pages/home')));

export const Route = createFileRoute('/_dashboard/home')({
  component: UniversalHomePage
});
