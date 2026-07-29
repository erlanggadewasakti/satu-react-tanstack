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
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

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
