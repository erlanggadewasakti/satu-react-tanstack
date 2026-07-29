import { createFileRoute, Navigate } from '@tanstack/react-router';
import { APP_AUTH } from 'config';

export const Route = createFileRoute('/_auth/login')({
  component: () => <Navigate to={`/${APP_AUTH}/login`} replace />
});
