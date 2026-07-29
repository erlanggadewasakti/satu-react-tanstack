import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const Auth0AuthForgotPassword = Loadable(lazy(() => import('pages/auth/auth0/forgot-password')));

export const Route = createFileRoute('/_auth/auth0/forgot-password')({
  component: Auth0AuthForgotPassword
});
