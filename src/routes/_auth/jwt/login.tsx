import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const JwtAuthLogin = Loadable(lazy(() => import('pages/auth/jwt/login')));

export const Route = createFileRoute('/_auth/jwt/login')({
  component: JwtAuthLogin
});
