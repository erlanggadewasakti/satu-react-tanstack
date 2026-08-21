import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
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
        <TanStackDevtools
          config={{
            position: 'bottom-right'
          }}
          plugins={[
            {
              name: 'Router',
              render: <TanStackRouterDevtoolsPanel />
            },
            {
              name: 'Query',
              render: <ReactQueryDevtoolsPanel />
            }
          ]}
        />
      </SearchProvider>
    </SubAppProvider>
  );
}
