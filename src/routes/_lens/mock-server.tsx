import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_lens/mock-server')({
  component: () => <Navigate to="/example/mock-server" replace />
});
