import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const AwsAuthRegister = Loadable(lazy(() => import('pages/auth/aws/register')));

export const Route = createFileRoute('/_auth/aws/register')({
  component: AwsAuthRegister
});
