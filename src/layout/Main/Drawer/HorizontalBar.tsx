// material-ui
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// project-imports
import Navigation from './DrawerContent/Navigation';

import { HEADER_HEIGHT } from 'config';
import { withAlpha } from 'utils/colorUtils';
import useConfig from 'hooks/useConfig';

// ==============================|| HORIZONTAL MENU ||============================== //

export default function CustomAppBar() {
  const {
    state: { container }
  } = useConfig();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return (
    <AppBar
      elevation={0}
      sx={(theme) => ({
        top: HEADER_HEIGHT,
        height: HEADER_HEIGHT,
        bgcolor: withAlpha(theme.vars.palette.background.default, 0.8),
        backdropFilter: 'blur(8px)',
        width: '100%',
        justifyContent: 'center',
        borderTop: `1px solid ${theme.vars.palette.divider}`,
        zIndex: 1098,
        color: 'secondary.main',
        boxShadow: trigger ? theme.vars.customShadows.z1 : theme.vars.customShadows.z2
      })}
    >
      <Container maxWidth={container ? 'xl' : false}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Navigation />
        </Box>
      </Container>
    </AppBar>
  );
}
