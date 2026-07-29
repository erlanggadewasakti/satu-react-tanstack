import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const SupabaseAuthCheckMail = Loadable(lazy(() => import('pages/auth/supabase/check-mail')));

export const Route = createFileRoute('/_auth/supabase/check-mail')({
  component: SupabaseAuthCheckMail
});
