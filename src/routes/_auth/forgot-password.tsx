import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/jwt/forgot-password')));

export const Route = createFileRoute('/_auth/forgot-password')({
  component: AuthForgotPassword
});
