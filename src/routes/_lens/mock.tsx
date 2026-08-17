import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const MockPage = Loadable(lazy(() => import('pages/mock')));

export const Route = createFileRoute('/_lens/mock')({
  component: MockPage
});
