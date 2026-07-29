import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const SupabaseAuthForgotPassword = Loadable(lazy(() => import('pages/auth/supabase/forgot-password')));

export const Route = createFileRoute('/_auth/supabase/forgot-password')({
  component: SupabaseAuthForgotPassword
});
