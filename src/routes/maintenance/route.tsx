import { createFileRoute } from '@tanstack/react-router';
import PagesLayout from 'layout/Pages';

export const Route = createFileRoute('/maintenance')({
  component: PagesLayout
});
