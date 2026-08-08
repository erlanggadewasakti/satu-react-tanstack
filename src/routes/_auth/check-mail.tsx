import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const AuthCheckMail = Loadable(lazy(() => import('pages/auth/jwt/check-mail')));

export const Route = createFileRoute('/_auth/check-mail')({
  component: AuthCheckMail
});
