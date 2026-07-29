import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const ContactUS = Loadable(lazy(() => import('pages/contact-us')));

export const Route = createFileRoute('/_simple/contact-us')({
  component: ContactUS
});
