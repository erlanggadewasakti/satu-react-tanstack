import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const AwsAuthCheckMail = Loadable(lazy(() => import('pages/auth/aws/check-mail')));

export const Route = createFileRoute('/_auth/aws/check-mail')({
  component: AwsAuthCheckMail
});
