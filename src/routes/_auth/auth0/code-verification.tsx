import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const Auth0AuthCodeVerification = Loadable(lazy(() => import('pages/auth/auth0/code-verification')));

export const Route = createFileRoute('/_auth/auth0/code-verification')({
  component: Auth0AuthCodeVerification
});
