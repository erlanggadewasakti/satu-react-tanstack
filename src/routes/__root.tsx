import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { SubAppProvider } from 'contexts/SubAppContext';
import { SearchProvider } from 'contexts/SearchContext';

export const Route = createRootRoute({
  component: RootComponent
});

function RootComponent() {
  return (
    <SubAppProvider>
      <SearchProvider>
        <Outlet />
        {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
      </SearchProvider>
    </SubAppProvider>
  );
}
