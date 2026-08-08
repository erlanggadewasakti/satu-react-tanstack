import { RouterProvider } from '@tanstack/react-router';

// project-imports
import { router } from './router';
import ThemeCustomization from 'themes';

import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import Customization from 'components/customization';
import Snackbar from 'components/@extended/Snackbar';

// auth-provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

export default function App() {
  return (
    <>
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
    </>
  );
}
