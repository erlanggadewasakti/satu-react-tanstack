import { createFileRoute } from '@tanstack/react-router';
import DashboardLayout from 'layout/Dashboard';

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout
});
