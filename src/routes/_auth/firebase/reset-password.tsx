import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const FirebaseAuthResetPassword = Loadable(lazy(() => import('pages/auth/firebase/reset-password')));

export const Route = createFileRoute('/_auth/firebase/reset-password')({
  component: FirebaseAuthResetPassword
});
