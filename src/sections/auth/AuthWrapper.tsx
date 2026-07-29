import { ReactElement } from 'react';
import useSearchParams from 'hooks/useSearchParams';

// material-ui
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import AuthCard from './AuthCard';
import LoginProvider from './LoginProvider';

import useAuth from 'hooks/useAuth';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground';

interface Props {
  children: ReactElement;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }: Props) {
  const { isLoggedIn } = useAuth();

  const [searchParams] = useSearchParams();
  const authParam = searchParams.get('auth') || '';

  let documentationLink: string = 'https://phoenixcoded.gitbook.io/able-pro/authentication';

  switch (authParam) {
    case 'auth0':
      documentationLink = 'https://phoenixcoded.gitbook.io/able-pro/authentication/switch-to-auth0';
      break;
    case 'firebase':
      documentationLink = 'https://phoenixcoded.gitbook.io/able-pro/authentication/switch-to-firebase';
      break;
    case 'aws':
      documentationLink = 'https://phoenixcoded.gitbook.io/able-pro/authentication/switch-to-aws-cognito';
      break;
    case 'supabase':
      documentationLink = 'https://phoenixcoded.gitbook.io/able-pro/authentication/switch-to-supabase';
      break;
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AuthBackground />
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Grid size={12}>
          <Grid
            size={12}
            container
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' }
            }}
          >
            <Grid>
              {!isLoggedIn && authParam && (
                <Box sx={{ maxWidth: { xs: 400, lg: 475 }, margin: { xs: 2.5, md: 3 }, '& > *': { flexGrow: 1, flexBasis: '50%' } }}>
                  <Alert variant="outlined" color="primary" severity="info">
                    <Typography variant="h5">View Only</Typography>
                    <Typography variant="h6">
                      This page is view-only. To make it fully functional, please read the documentation provided{' '}
                      <Link href={documentationLink} target="_blank">
                        here
                      </Link>{' '}
                      after purchasing the theme.
                    </Typography>
                  </Alert>
                </Box>
              )}
              <AuthCard>{children}</AuthCard>
              {!isLoggedIn && (
                <Box sx={{ maxWidth: { xs: 400, sm: 475 }, margin: { xs: 2.5, md: 3 }, '& > *': { flexGrow: 1, flexBasis: '50%' } }}>
                  <Grid size={12}>
                    <Divider sx={{ mb: 3 }}>
                      <Typography variant="caption"> Check other login views </Typography>
                    </Divider>
                  </Grid>
                  <Grid size={12}>
                    <LoginProvider currentLoginWith={authParam} />
                  </Grid>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
