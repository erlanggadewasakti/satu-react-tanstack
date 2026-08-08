import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/jwt/code-verification')));

export const Route = createFileRoute('/_auth/code-verification')({
  component: AuthCodeVerification
});
