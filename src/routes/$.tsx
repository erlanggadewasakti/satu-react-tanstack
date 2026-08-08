import { createFileRoute } from '@tanstack/react-router';
import { Error404 } from 'components/maintenance';

export const Route = createFileRoute('/$')({
  component: Error404
});
