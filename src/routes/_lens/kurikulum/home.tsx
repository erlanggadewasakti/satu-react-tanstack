import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const KurikulumHomePage = Loadable(lazy(() => import('pages/kurikulum/home')));

export const Route = createFileRoute('/_lens/kurikulum/home')({
  component: KurikulumHomePage
});
