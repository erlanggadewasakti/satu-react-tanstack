import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { Error404, Error500 } from 'components/maintenance';

export const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
  defaultNotFoundComponent: Error404,
  defaultErrorComponent: Error500
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
