import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/jwt/')({
  component: () => <Navigate to="/jwt/login" replace />
});
