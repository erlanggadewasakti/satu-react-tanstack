import { createRootRoute, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { SubAppProvider } from 'contexts/SubAppProvider';
import { SearchProvider } from 'contexts/SearchProvider';

const Devtools = import.meta.env.DEV
  ? lazy(() =>
      Promise.all([
        import('@tanstack/react-devtools'),
        import('@tanstack/react-query-devtools'),
        import('@tanstack/react-router-devtools')
      ]).then(([devtools, queryDevtools, routerDevtools]) => ({
        default: () => (
          <devtools.TanStackDevtools
            config={{
              position: 'bottom-right'
            }}
            plugins={[
              {
                name: 'Router',
                render: <routerDevtools.TanStackRouterDevtoolsPanel />
              },
              {
                name: 'Query',
                render: <queryDevtools.ReactQueryDevtoolsPanel />
              }
            ]}
          />
        )
      }))
    )
  : () => null;

export const Route = createRootRoute({
  component: RootComponent
});

function RootComponent() {
  return (
    <SubAppProvider>
      <SearchProvider>
        <Outlet />
        {import.meta.env.DEV && (
          <Suspense fallback={null}>
            <Devtools />
          </Suspense>
        )}
      </SearchProvider>
    </SubAppProvider>
  );
}
