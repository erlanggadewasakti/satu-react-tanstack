import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const PerkuliahanHomePage = Loadable(lazy(() => import('pages/perkuliahan/home')));

export const Route = createFileRoute('/_lens/perkuliahan/home')({
  component: PerkuliahanHomePage
});
