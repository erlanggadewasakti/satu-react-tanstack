import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const SilabusHomePage = Loadable(lazy(() => import('pages/silabus/home')));

export const Route = createFileRoute('/_dashboard/silabus/home')({
  component: SilabusHomePage
});
