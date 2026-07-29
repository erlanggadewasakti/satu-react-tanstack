import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const SupabaseAuthLogin = Loadable(lazy(() => import('pages/auth/supabase/login')));

export const Route = createFileRoute('/_auth/supabase/login')({
  component: SupabaseAuthLogin
});
