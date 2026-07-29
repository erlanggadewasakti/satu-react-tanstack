import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const SupabaseAuthResetPassword = Loadable(lazy(() => import('pages/auth/supabase/reset-password')));

export const Route = createFileRoute('/_auth/supabase/reset-password')({
  component: SupabaseAuthResetPassword
});
