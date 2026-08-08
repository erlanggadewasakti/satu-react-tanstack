import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const PortofolioHomePage = Loadable(lazy(() => import('pages/portofolio/home')));

export const Route = createFileRoute('/_dashboard/portofolio/home')({
  component: PortofolioHomePage
});
