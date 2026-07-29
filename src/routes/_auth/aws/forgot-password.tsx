import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const AwsAuthForgotPassword = Loadable(lazy(() => import('pages/auth/aws/forgot-password')));

export const Route = createFileRoute('/_auth/aws/forgot-password')({
  component: AwsAuthForgotPassword
});
