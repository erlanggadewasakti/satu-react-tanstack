import { createFileRoute, redirect } from '@tanstack/react-router';
import { APP_DEFAULT_PATH } from 'config';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: APP_DEFAULT_PATH, replace: true });
  }
});
