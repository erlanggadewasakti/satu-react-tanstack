import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const JwtAuthForgotPassword = Loadable(lazy(() => import('pages/auth/jwt/forgot-password')));

export const Route = createFileRoute('/_auth/jwt/forgot-password')({
  component: JwtAuthForgotPassword
});
