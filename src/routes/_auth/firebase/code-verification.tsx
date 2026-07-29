import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const FirebaseAuthCodeVerification = Loadable(lazy(() => import('pages/auth/firebase/code-verification')));

export const Route = createFileRoute('/_auth/firebase/code-verification')({
  component: FirebaseAuthCodeVerification
});
