import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const FirebaseAuthRegister = Loadable(lazy(() => import('pages/auth/firebase/register')));

export const Route = createFileRoute('/_auth/firebase/register')({
  component: FirebaseAuthRegister
});
