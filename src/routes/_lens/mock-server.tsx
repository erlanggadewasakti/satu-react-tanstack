import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const MockServerPage = Loadable(lazy(() => import('pages/mock-server')));

export const Route = createFileRoute('/_lens/mock-server')({
  component: MockServerPage
});
