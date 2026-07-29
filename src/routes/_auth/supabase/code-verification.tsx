import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const SupabaseAuthCodeVerification = Loadable(lazy(() => import('pages/auth/supabase/code-verification')));

export const Route = createFileRoute('/_auth/supabase/code-verification')({
  component: SupabaseAuthCodeVerification
});
