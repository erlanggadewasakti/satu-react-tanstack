import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';

// project-imports
import { queryClient } from 'api/client';
import { router } from './router';
import ThemeCustomization from 'themes';

import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import Customization from 'components/customization';
import Snackbar from 'components/@extended/Snackbar';

// auth-provider
import { JWTProvider as AuthProvider } from 'contexts/JWTProvider';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeCustomization>
        <RTLLayout>
          <Locales>
            <AuthProvider>
              <>
                <RouterProvider router={router} />
                <Customization />
                <Snackbar />
              </>
            </AuthProvider>
          </Locales>
        </RTLLayout>
      </ThemeCustomization>
    </QueryClientProvider>
  );
}
