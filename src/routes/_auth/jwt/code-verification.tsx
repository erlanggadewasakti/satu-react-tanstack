import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const JwtAuthCodeVerification = Loadable(lazy(() => import('pages/auth/jwt/code-verification')));

export const Route = createFileRoute('/_auth/jwt/code-verification')({
  component: JwtAuthCodeVerification
});
