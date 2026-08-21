import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const ExampleHomePage = Loadable(lazy(() => import('pages/example/home')));

export const Route = createFileRoute('/_lens/example/home')({
  component: ExampleHomePage
});
