import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const JwtAuthResetPassword = Loadable(lazy(() => import('pages/auth/jwt/reset-password')));

export const Route = createFileRoute('/_auth/jwt/reset-password')({
  component: JwtAuthResetPassword
});
