import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const SupabaseAuthRegister = Loadable(lazy(() => import('pages/auth/supabase/register')));

export const Route = createFileRoute('/_auth/supabase/register')({
  component: SupabaseAuthRegister
});
