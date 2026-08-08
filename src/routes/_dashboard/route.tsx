import { createFileRoute } from '@tanstack/react-router';
import DashboardLayout from 'layout/Main';

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout
});
