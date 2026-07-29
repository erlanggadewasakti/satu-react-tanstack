import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const AwsAuthResetPassword = Loadable(lazy(() => import('pages/auth/aws/reset-password')));

export const Route = createFileRoute('/_auth/aws/reset-password')({
  component: AwsAuthResetPassword
});
