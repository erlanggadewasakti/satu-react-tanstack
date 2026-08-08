import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const PenilaianHomePage = Loadable(lazy(() => import('pages/penilaian/home')));

export const Route = createFileRoute('/_dashboard/penilaian/home')({
  component: PenilaianHomePage
});
