// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

// project-imports
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthCard from 'sections/auth/AuthCard';
import AuthLogin from 'sections/auth/jwt/AuthLogin';

// assets
import telkomLogo from 'assets/images/auth/telkom-logo.svg';

// ================================|| LOGIN PAGE ||================================ //

export default function Login() {
  return (
    <AuthWrapper>
      {/* MOBILE-ONLY LOGO */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mb: 3 }}>
        <Box component="img" src={telkomLogo} alt="Telkom University" sx={{ width: 72, height: 'auto' }} />
      </Box>

      <AuthCard>
        <Grid container spacing={2.5}>
          {/* CARD HEADER: LENS OBE TITLE & SUBTITLE */}
          <Grid size={12}>
            <Typography
              variant="h2"
              sx={{
                color: 'primary.main',
                fontWeight: 800,
                letterSpacing: -0.5,
                fontSize: { xs: '1.75rem', sm: '2.1rem' }
              }}
            >
              LENS
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              <FormattedMessage id="login.sso-subtitle" />
            </Typography>
          </Grid>

          {/* FORM COMPONENT */}
          <Grid size={12}>
            <AuthLogin />
          </Grid>
        </Grid>
      </AuthCard>
    </AuthWrapper>
  );
}
