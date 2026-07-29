import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const FirebaseAuthForgotPassword = Loadable(lazy(() => import('pages/auth/firebase/forgot-password')));

export const Route = createFileRoute('/_auth/firebase/forgot-password')({
  component: FirebaseAuthForgotPassword
});
