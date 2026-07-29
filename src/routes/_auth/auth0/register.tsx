import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const Auth0AuthRegister = Loadable(lazy(() => import('pages/auth/auth0/register')));

export const Route = createFileRoute('/_auth/auth0/register')({
  component: Auth0AuthRegister
});
