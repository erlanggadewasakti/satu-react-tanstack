import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_lens/mock')({
  component: () => <Navigate to="/example/mock" replace />
});
