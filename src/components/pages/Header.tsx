import { useState, cloneElement } from 'react';
import { Link as RouterLink } from '@tanstack/react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import Logo from 'components/logo';
import IconButton from 'components/@extended/IconButton';
import useAuth from 'hooks/useAuth';
import { APP_DEFAULT_PATH } from 'config';
import { withAlpha } from 'utils/colorUtils';

// assets
import { ArrowDown2, ArrowUp2, HamburgerMenu, Minus } from 'iconsax-reactjs';
import GithubIcon from 'assets/third-party/github';

interface HeaderProps {
  variant?: 'simple' | 'component';
  enableElevationScroll?: boolean;
  enableComponentDrawer?: boolean;
  onComponentDrawerToggle?: (open: boolean) => void;
  isComponentDrawerOpened?: boolean;
}

// ==============================|| ELEVATION SCROLL COMPONENT ||============================== //

function ElevationScroll({ children, window }: any) {
  const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window() : undefined
  });

  return cloneElement(children, {
    style: {
      boxShadow: trigger ? '0 8px 6px -10px rgba(0, 0, 0, 0.5)' : 'none',
      backgroundColor: trigger
        ? withAlpha(theme.vars.palette.background.default, 0.8)
        : withAlpha(theme.vars.palette.background.default, 0.1)
    }
  });
}

// ==============================|| COMMON HEADER COMPONENT ||============================== //

export default function Header({
  variant = 'simple',
  enableElevationScroll = true,
  enableComponentDrawer = false,
  onComponentDrawerToggle,
  isComponentDrawerOpened = false
}: HeaderProps) {
  const { isLoggedIn } = useAuth();
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const drawerToggler = (open: boolean) => (event: any) => {
    if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  const handleComponentDrawerToggle = () => {
    if (enableComponentDrawer && onComponentDrawerToggle) {
      onComponentDrawerToggle(!isComponentDrawerOpened);
    } else {
      drawerToggler(true);
    }
  };

  const getDesktopLinks = () => {
    if (variant === 'component') {
      return (
        <Stack
          direction="row"
          sx={{
            gap: 3,
            alignItems: 'center',
            display: { xs: 'none', md: 'flex' },
            '& .header-link': { fontWeight: 500, '&:hover': { color: 'primary.main' } }
          }}
        >
          <Link className="header-link" color="secondary.main" component={RouterLink} to="/login" target="_blank" underline="none">
            Dashboard
          </Link>
          <Link className="header-link" color="primary" component={RouterLink} to="/components-overview" underline="none">
            Components
          </Link>
          <Link
            className="header-link"
            color="secondary.main"
            href="https://phoenixcoded.gitbook.io/able-pro/"
            target="_blank"
            underline="none"
          >
            Documentation
          </Link>
          <Link
            className="header-link"
            sx={{ fontSize: 24, verticalAlign: 'middle' }}
            color="secondary.main"
            href="https://github.com/codedthemes/mantis-free-react-admin-template"
            target="_blank"
            underline="none"
          >
            <IconButton
              size="large"
              shape="rounded"
              color="secondary"
              sx={(theme) => ({
                bgcolor: 'secondary.light',
                color: 'secondary.darker',
                '&:hover': {
                  color: 'secondary.lighter',
                  bgcolor: 'secondary.800',
                  svg: { stroke: theme.vars.palette.common.white },
                  ...theme.applyStyles('dark', { bgcolor: 'secondary.200' })
                }
              })}
            >
              <GithubIcon />
            </IconButton>
          </Link>
        </Stack>
      );
    }

    return (
      <Stack
        direction="row"
        sx={{
          gap: 3,
          alignItems: 'center',
          display: { xs: 'none', md: 'flex' },
          '& .header-link': { fontWeight: 500, '&:hover': { color: 'primary.main' } }
        }}
      >
        <Link
          className="header-link"
          color="secondary.main"
          component={RouterLink}
          to={isLoggedIn ? APP_DEFAULT_PATH : '/login'}
          target="_blank"
          underline="none"
        >
          {isLoggedIn ? 'Dashboard' : 'Login'}
        </Link>
        <Link className="header-link" color="secondary.main" component={RouterLink} to="/components-overview" underline="none">
          Components
        </Link>
        <Link
          className="header-link"
          color="secondary.main"
          href="https://phoenixcoded.gitbook.io/able-pro/"
          target="_blank"
          underline="none"
        >
          Documentation
        </Link>
        <Link
          className="header-link"
          sx={{ fontSize: 24, verticalAlign: 'middle' }}
          color="secondary.main"
          href="https://github.com/codedthemes/mantis-free-react-admin-template"
          target="_blank"
          underline="none"
        >
          <IconButton
            size="large"
            shape="rounded"
            color="secondary"
            sx={(theme) => ({
              bgcolor: 'secondary.light',
              color: 'secondary.darker',
              '&:hover': {
                color: 'secondary.lighter',
                bgcolor: 'secondary.800',
                svg: { stroke: theme.vars.palette.common.white },
                ...theme.applyStyles('dark', { bgcolor: 'secondary.200' })
              }
            })}
          >
            <GithubIcon />
          </IconButton>
        </Link>
      </Stack>
    );
  };

  const getMobileMenu = () => {
    if (variant === 'component') {
      return (
        <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
          <Button
            variant="outlined"
            size="small"
            color="warning"
            component={RouterLink}
            to={isLoggedIn ? APP_DEFAULT_PATH : '/login'}
            sx={{ height: 28 }}
          >
            {isLoggedIn ? 'Dashboard' : 'Login'}
          </Button>

          <IconButton color="secondary" onClick={handleComponentDrawerToggle}>
            <HamburgerMenu />
          </IconButton>
        </Stack>
      );
    }

    return (
      <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
        <Button variant="outlined" size="small" color="warning" component={RouterLink} to="/components-overview" sx={{ height: 28 }}>
          All Components
        </Button>
        <IconButton color="secondary" onClick={drawerToggler(true)}>
          <HamburgerMenu />
        </IconButton>
      </Stack>
    );
  };

  const getDrawerContent = () => {
    if (variant === 'component') {
      return null; // Component variant doesn't use drawer
    }

    return (
      <Drawer anchor="top" open={drawerToggle} onClose={drawerToggler(false)}>
        <Box sx={{ width: 'auto', '& .MuiListItemIcon-root': { fontSize: '1rem', minWidth: 28 } }} role="presentation">
          <List>
            <Link component={RouterLink} underline="none" to={isLoggedIn ? APP_DEFAULT_PATH : '/login'} target="_blank">
              <ListItemButton>
                <ListItemIcon>
                  <Minus />
                </ListItemIcon>
                <ListItemText
                  primary={isLoggedIn ? 'Dashboard' : 'Login'}
                  slotProps={{ primary: { variant: 'h6', color: 'text.primary' } }}
                />
              </ListItemButton>
            </Link>
            <Link component={RouterLink} underline="none" to={'/components-overview'} target="_blank">
              <ListItemButton>
                <ListItemIcon>
                  <Minus />
                </ListItemIcon>
                <ListItemText primary="All Components" slotProps={{ primary: { variant: 'h6', color: 'text.primary' } }} />
              </ListItemButton>
            </Link>
            <Link underline="none" href="https://github.com/codedthemes/mantis-free-react-admin-template" target="_blank">
              <ListItemButton>
                <ListItemIcon>
                  <Minus />
                </ListItemIcon>
                <ListItemText primary="Free Version" slotProps={{ primary: { variant: 'h6', color: 'text.primary' } }} />
              </ListItemButton>
            </Link>
            <Link underline="none" href="https://phoenixcoded.gitbook.io/able-pro/" target="_blank">
              <ListItemButton>
                <ListItemIcon>
                  <Minus />
                </ListItemIcon>
                <ListItemText primary="Documentation" slotProps={{ primary: { variant: 'h6', color: 'text.primary' } }} />
              </ListItemButton>
            </Link>
            <Link underline="none" href="https://codedthemes.support-hub.io/" target="_blank">
              <ListItemButton>
                <ListItemIcon>
                  <Minus />
                </ListItemIcon>
                <ListItemText primary="Support" slotProps={{ primary: { variant: 'h6', color: 'text.primary' } }} />
              </ListItemButton>
            </Link>
            <Link underline="none" href="https://mui.com/store/items/mantis-react-admin-dashboard-template/" target="_blank">
              <ListItemButton>
                <ListItemIcon>
                  <Minus />
                </ListItemIcon>
                <ListItemText primary="Purchase Now" slotProps={{ primary: { variant: 'h6', color: 'text.primary' } }} />
                <Chip color="primary" label={import.meta.env.VITE_APP_VERSION} size="small" />
              </ListItemButton>
            </Link>
            <Link style={{ textDecoration: 'none' }} href="#" onClick={() => setOpenDrawer(!openDrawer)}>
              <ListItemButton>
                <ListItemIcon>
                  <Minus />
                </ListItemIcon>
                <ListItemText primary="Live Preview" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                <Stack sx={{ path: { strokeWidth: 2 } }}>{openDrawer ? <ArrowUp2 size="16" /> : <ArrowDown2 size="16" />}</Stack>
              </ListItemButton>
            </Link>
          </List>
        </Box>
      </Drawer>
    );
  };

  const headerContent = (
    <AppBar
      sx={(theme) => ({
        bgcolor: withAlpha(theme.vars.palette.background.default, 0.1),
        backdropFilter: 'blur(8px)',
        color: 'text.primary',
        boxShadow: 'none'
      })}
    >
      <Container maxWidth="xl" disableGutters={downMD}>
        <Toolbar sx={{ px: { xs: 1.5, sm: 4, md: 0, lg: 0 }, py: 1 }}>
          <Stack direction="row" sx={{ alignItems: 'center', flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
            <Typography sx={{ textAlign: 'left', display: 'inline-block' }}>
              <Logo to="/" />
            </Typography>
            <Chip
              label={import.meta.env.VITE_APP_VERSION}
              variant="outlined"
              size="small"
              color="secondary"
              sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
            />
          </Stack>
          {getDesktopLinks()}
          <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', display: { xs: 'flex', md: 'none' } }}>
            <Typography sx={{ textAlign: 'left', display: 'inline-block' }}>
              <Logo to="/" />
            </Typography>
            {getMobileMenu()}
            {getDrawerContent()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );

  if (enableElevationScroll) {
    return <ElevationScroll>{headerContent}</ElevationScroll>;
  }

  return headerContent;
}
