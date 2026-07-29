import { createFileRoute } from '@tanstack/react-router';
import SimpleLayout from 'layout/Simple';

export const Route = createFileRoute('/_simple')({
  component: SimpleLayout
});
