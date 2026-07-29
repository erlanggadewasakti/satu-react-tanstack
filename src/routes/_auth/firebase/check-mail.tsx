import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const FirebaseAuthCheckMail = Loadable(lazy(() => import('pages/auth/firebase/check-mail')));

export const Route = createFileRoute('/_auth/firebase/check-mail')({
  component: FirebaseAuthCheckMail
});
