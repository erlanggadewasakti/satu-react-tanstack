import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const Auth0AuthCheckMail = Loadable(lazy(() => import('pages/auth/auth0/check-mail')));

export const Route = createFileRoute('/_auth/auth0/check-mail')({
  component: Auth0AuthCheckMail
});
