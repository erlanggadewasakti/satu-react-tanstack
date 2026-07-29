import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const AwsAuthCodeVerification = Loadable(lazy(() => import('pages/auth/aws/code-verification')));

export const Route = createFileRoute('/_auth/aws/code-verification')({
  component: AwsAuthCodeVerification
});
