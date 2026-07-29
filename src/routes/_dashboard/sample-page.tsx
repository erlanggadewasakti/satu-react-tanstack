import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

export const Route = createFileRoute('/_dashboard/sample-page')({
  component: SamplePage
});
