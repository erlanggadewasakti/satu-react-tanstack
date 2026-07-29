import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const FirebaseAuthLogin = Loadable(lazy(() => import('pages/auth/firebase/login')));

export const Route = createFileRoute('/_auth/firebase/login')({
  component: FirebaseAuthLogin
});
