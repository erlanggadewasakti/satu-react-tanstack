import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const Auth0AuthLogin = Loadable(lazy(() => import('pages/auth/auth0/login')));

export const Route = createFileRoute('/_auth/auth0/login')({
  component: Auth0AuthLogin
});
