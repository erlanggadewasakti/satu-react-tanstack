import { ReactNode } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project-imports
import AuthSideBanner from './AuthSideBanner';

interface Props {
  children: ReactNode;
}

// ==============================|| AUTHENTICATION - SPLIT SCREEN WRAPPER ||============================== //

export default function AuthWrapper({ children }: Props) {
  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        width: '100vw',
        m: 0,
        p: 0,
        bgcolor: 'background.default'
      }}
    >
      {/* LEFT COLUMN: BRANDING & ANIMATED BOKEH (DESKTOP & TABLET LANDSCAPE) */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: { xs: 'none', md: 'block' },
          height: '100vh',
          position: 'sticky',
          top: 0
        }}
      >
        <AuthSideBanner />
      </Grid>

      {/* RIGHT COLUMN: LOGIN FORM CARD */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2.5, sm: 4, md: 6 }
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 460 }}>{children}</Box>
      </Grid>
    </Grid>
  );
}
