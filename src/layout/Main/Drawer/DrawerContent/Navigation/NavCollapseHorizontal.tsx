import { useState, MouseEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';

// material-ui
import { styled } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import SafeFormattedMessage from 'components/@extended/SafeFormattedMessage';
import Transitions from 'components/@extended/Transitions';
import SimpleBar from 'components/third-party/SimpleBar';

// assets
import { ArrowDown2, ArrowRight2, Copy } from 'iconsax-react';

// types
import { NavItemType } from 'types/menu';

type VirtualElement = {
  getBoundingClientRect: () => DOMRect;
  contextElement?: Element;
};

// mini-menu - wrapper
const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: 'visible',
  zIndex: 1202,
  minWidth: 180,
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 38,
    left: -5,
    width: 10,
    height: 10,
    backgroundColor: theme.vars.palette.background.paper,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 120,
    borderLeft: `1px solid ${theme.vars.palette.divider}`,
    borderBottom: `1px solid ${theme.vars.palette.divider}`
  }
}));

const FlexBox = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' };

function isItemRouteActive(menu: NavItemType, pathname: string): boolean {
  const targetPath = menu?.link || menu?.url;
  if (!targetPath) return false;
  return pathname === targetPath || (targetPath !== '/' && pathname.startsWith(targetPath + '/'));
}

function getMenuColors(isActive: boolean) {
  const selectedTextColor = isActive ? 'primary.main' : null;
  return {
    light: selectedTextColor || 'secondary.main',
    dark: selectedTextColor || 'secondary.400'
  };
}

function getMenuIcon(menu: NavItemType, level: number) {
  if (menu.icon) {
    const Icon = menu.icon;
    return <Icon variant="Bulk" size={24} />;
  }
  return level === 1 ? <Copy variant="Bulk" size={24} /> : null;
}

interface PopperProps {
  id?: string;
  open: boolean;
  anchorEl: VirtualElement | (() => VirtualElement) | null | undefined;
  onClose: () => void;
  children: ReactNode;
}

function NavCollapseHorizontalPopper({ id, open, anchorEl, onClose, children }: PopperProps) {
  if (!anchorEl) return null;

  return (
    <PopperStyled
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="right-start"
      sx={{ zIndex: 2001 }}
      modifiers={[{ name: 'offset', options: { offset: [-14, 0] } }]}
    >
      {({ TransitionProps }) => (
        <Transitions in={open} {...TransitionProps}>
          <Paper
            sx={(theme) => ({
              overflow: 'hidden',
              py: 0.5,
              boxShadow: theme.vars.customShadows.z1,
              border: '1px solid ',
              borderColor: 'divider',
              backgroundImage: 'none'
            })}
          >
            <ClickAwayListener onClickAway={onClose}>
              <SimpleBar sx={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: 'calc(100vh - 170px)' }}>{children}</SimpleBar>
            </ClickAwayListener>
          </Paper>
        </Transitions>
      )}
    </PopperStyled>
  );
}

interface Props {
  menu: NavItemType;
  level: number;
  navCollapse: ReactNode;
}

export default function NavCollapseHorizontal({ menu, level, navCollapse }: Props) {
  const navigation = useNavigate();
  const { pathname } = useLocation();

  const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);

  const miniMenuOpened = Boolean(anchorEl);
  const isSelected = isItemRouteActive(menu, pathname);
  const colors = getMenuColors(isSelected || miniMenuOpened);
  const menuIcon = getMenuIcon(menu, level);
  const popperId = miniMenuOpened ? `collapse-pop-${menu.id}` : undefined;

  const handleHover = (event: MouseEvent<HTMLElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlerIconLink = () => {
    if (menu.url) navigation({ to: menu.url as any });
  };

  return (
    <ListItemButton
      id={`boundary-${popperId}`}
      selected={isSelected}
      onMouseEnter={handleHover}
      onMouseLeave={handleClose}
      onClick={handleHover}
      aria-describedby={popperId}
      disableTouchRipple
      className={anchorEl ? 'Mui-selected' : ''}
      sx={{
        zIndex: 121,
        borderRadius: level >= 1 ? 0 : 1,
        '&.Mui-selected': {
          '&:hover': { bgcolor: 'transparent' },
          bgcolor: 'transparent'
        }
      }}
    >
      <Box onClick={handlerIconLink} sx={FlexBox}>
        {menuIcon && (
          <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36, color: 'secondary.dark' }}>{menuIcon}</ListItemIcon>
        )}
        <ListItemText
          primary={
            <Typography
              variant="h6"
              component="span"
              sx={(theme) => ({
                fontWeight: isSelected || anchorEl ? 500 : 400,
                color: colors.light,
                ...theme.applyStyles('dark', { color: colors.dark })
              })}
            >
              <SafeFormattedMessage id={menu.title} />
            </Typography>
          }
        />
        <Box component="span" sx={(theme) => ({ color: colors.light, ...theme.applyStyles('dark', { color: colors.dark }) })}>
          {miniMenuOpened ? <ArrowRight2 size={12} /> : <ArrowDown2 size={12} />}
        </Box>
      </Box>

      <NavCollapseHorizontalPopper id={popperId} open={miniMenuOpened} anchorEl={anchorEl} onClose={handleClose}>
        {navCollapse}
      </NavCollapseHorizontalPopper>
    </ListItemButton>
  );
}
