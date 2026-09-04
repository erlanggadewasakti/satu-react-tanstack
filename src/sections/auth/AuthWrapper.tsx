import { ReactNode } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project-imports
import AuthSideBanner, { AuthBokehBackground } from './AuthSideBanner';

interface Props {
  children: ReactNode;
}

// ==============================|| AUTHENTICATION - SPLIT SCREEN WRAPPER ||============================== //

export default function AuthWrapper({ children }: Props) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: { xs: 'background.default', md: '#171717' }
      }}
    >
      {/* FULL-BLEED ANIMATED BOKEH (DESKTOP) */}
      <AuthBokehBackground />

      <Grid
        container
        sx={{
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* LEFT COLUMN: BRANDING & HEADLINES (DESKTOP & TABLET LANDSCAPE) */}
        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            display: { xs: 'none', md: 'block' },
            minHeight: '100vh'
          }}
        >
          <AuthSideBanner />
        </Grid>

        {/* RIGHT COLUMN: LOGIN FORM CARD */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2.5, sm: 4, md: 5 }
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 460 }}>{children}</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
