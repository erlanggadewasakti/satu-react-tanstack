import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const AwsAuthLogin = Loadable(lazy(() => import('pages/auth/aws/login')));

export const Route = createFileRoute('/_auth/aws/login')({
  component: AwsAuthLogin
});
