import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const AuthRegister = Loadable(lazy(() => import('pages/auth/jwt/register')));

export const Route = createFileRoute('/_auth/register')({
  component: AuthRegister
});
