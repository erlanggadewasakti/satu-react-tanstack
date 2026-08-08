import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { SubAppProvider } from 'contexts/SubAppContext';

export const Route = createRootRoute({
  component: RootComponent
});

function RootComponent() {
  return (
    <SubAppProvider>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </SubAppProvider>
  );
}
