import { useState, Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import SafeFormattedMessage from 'components/@extended/SafeFormattedMessage';
import Transitions from 'components/@extended/Transitions';
import SimpleBar from 'components/third-party/SimpleBar';

import { useGetMenuMaster } from 'api/menu';
import useMenuCollapse from 'hooks/useMenuCollapse';

// assets
import { ArrowDown2, ArrowUp2, ArrowRight2, Copy } from 'iconsax-reactjs';

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

const arrowStyle = { size: 12, style: { marginLeft: 1 } };

function getMenuColors(isActive: boolean) {
  const selectedTextColor = isActive ? 'primary.main' : null;
  return {
    light: selectedTextColor || 'secondary.main',
    dark: selectedTextColor || 'secondary.400'
  };
}

function getMenuIcon(menu: NavItemType, level: number, drawerOpen: boolean) {
  if (menu.icon) {
    const Icon = menu.icon;
    return <Icon variant="Bulk" size={drawerOpen ? 22 : 24} />;
  }
  return level === 1 ? <Copy variant="Bulk" size={drawerOpen ? 22 : 24} /> : null;
}

function getListItemPadding(level: number, drawerOpen: boolean) {
  if (level === 2) return 3.25;
  if (!drawerOpen) return 1.5;
  if (level <= 3) return (level * 20) / 8;
  return (level * 20 + (level - 3) * 10) / 8;
}

function NavCollapseArrow({
  hasUrl,
  isOpen,
  isMiniOpened,
  onArrowClick,
  lightColor,
  darkColor
}: {
  hasUrl: boolean;
  isOpen: boolean;
  isMiniOpened: boolean;
  onArrowClick: (e: MouseEvent<HTMLElement>) => void;
  lightColor: string;
  darkColor: string;
}) {
  const icon = isMiniOpened ? (
    <ArrowRight2 {...arrowStyle} />
  ) : isOpen ? (
    <ArrowUp2 {...arrowStyle} />
  ) : (
    <ArrowDown2 {...arrowStyle} />
  );

  if (hasUrl) {
    return (
      <IconButton
        onClick={onArrowClick}
        color="secondary"
        variant="outlined"
        sx={(theme) => ({
          width: 20,
          height: 20,
          mr: '-5px !important',
          p: 0.25,
          borderColor: isOpen ? 'primary.light' : 'secondary.light',
          '&:hover': { borderColor: isOpen ? 'primary.main' : 'secondary.main' },
          color: lightColor,
          ...theme.applyStyles('dark', { color: darkColor })
        })}
      >
        {icon}
      </IconButton>
    );
  }

  return (
    <Box component="span" sx={(theme) => ({ color: lightColor, ...theme.applyStyles('dark', { color: darkColor }) })}>
      {icon}
    </Box>
  );
}

function NavCollapseItemIcon({
  icon,
  drawerOpen,
  isSelected,
  onClick,
  lightColor,
  darkColor
}: {
  icon: ReactNode;
  drawerOpen: boolean;
  isSelected: boolean;
  onClick: () => void;
  lightColor: string;
  darkColor: string;
}) {
  if (icon) {
    return (
      <ListItemIcon
        onClick={onClick}
        sx={(theme) => ({
          minWidth: 38,
          color: lightColor,
          ...theme.applyStyles('dark', { color: darkColor }),
          ...(!drawerOpen && {
            borderRadius: 1,
            width: 46,
            height: 46,
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': { bgcolor: 'secondary.200', ...theme.applyStyles('dark', { bgcolor: 'divider' }) },
            ...(isSelected && {
              bgcolor: 'primary.lighter',
              '&:hover': { bgcolor: 'primary.lighter' },
              ...theme.applyStyles('dark', { bgcolor: 'divider', '&:hover': { bgcolor: 'divider' } })
            })
          })
        })}
      >
        {icon}
      </ListItemIcon>
    );
  }

  if (drawerOpen) {
    return (
      <ListItemIcon sx={{ minWidth: 30 }}>
        <Dot size={isSelected ? 6 : 5} color={isSelected ? 'primary' : 'secondary'} />
      </ListItemIcon>
    );
  }

  return null;
}

function NavCollapseLabel({
  show,
  title,
  caption,
  isSelected,
  lightColor,
  darkColor
}: {
  show: boolean;
  title?: string;
  caption?: string;
  isSelected: boolean;
  lightColor: string;
  darkColor: string;
}) {
  if (!show) return null;

  return (
    <ListItemText
      primary={
        <Typography
          variant="h6"
          component="span"
          sx={(theme) => ({
            fontWeight: isSelected ? 500 : 400,
            color: lightColor,
            ...theme.applyStyles('dark', { color: darkColor })
          })}
        >
          <SafeFormattedMessage id={title} />
        </Typography>
      }
      secondary={
        caption && (
          <Typography variant="caption" color="secondary">
            <SafeFormattedMessage id={caption} />
          </Typography>
        )
      }
    />
  );
}

function NavCollapseMiniPopper({
  open,
  anchorEl,
  onClose,
  children
}: {
  open: boolean;
  anchorEl: VirtualElement | (() => VirtualElement) | null | undefined;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!anchorEl) return null;

  return (
    <PopperStyled open={open} anchorEl={anchorEl} placement="right-start" sx={{ zIndex: 2001 }}>
      {({ TransitionProps }) => (
        <Transitions in={open} {...TransitionProps}>
          <Paper
            sx={(theme) => ({
              overflow: 'hidden',
              boxShadow: theme.vars.customShadows.z1,
              backgroundImage: 'none',
              border: '1px solid ',
              borderColor: 'divider'
            })}
          >
            <ClickAwayListener onClickAway={onClose}>
              <SimpleBar sx={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: 'calc(100vh - 170px)' }}>
                {children}
              </SimpleBar>
            </ClickAwayListener>
          </Paper>
        </Transitions>
      )}
    </PopperStyled>
  );
}

function NavCollapseChildren({
  drawerOpen,
  isDropdown,
  isOpen,
  menuId,
  anchorEl,
  onClose,
  level,
  children
}: {
  drawerOpen: boolean;
  isDropdown: boolean | undefined;
  isOpen: boolean;
  menuId: string | undefined;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  level: number;
  children: ReactNode;
}) {
  const theme = useTheme();

  if (!drawerOpen) return null;

  if (isDropdown) {
    return (
      <Menu
        id={`${menuId}-menu`}
        aria-labelledby={`${menuId}-button`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { boxShadow: theme.shadows[2] } } }}
      >
        {children}
      </Menu>
    );
  }

  return (
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
      <List sx={{ py: 0, px: level <= 1 ? 1.5 : 0 }}>{children}</List>
    </Collapse>
  );
}

interface NavCollapseVerticalButtonProps {
  menu: NavItemType;
  level: number;
  drawerOpen: boolean;
  isSelected: boolean;
  isItemOpen: boolean;
  miniMenuOpened: boolean;
  anchorEl: VirtualElement | (() => VirtualElement) | null | undefined;
  anchorElCollapse: HTMLElement | null;
  colors: { light: string; dark: string };
  menuIcon: ReactNode;
  pl: number;
  showTextAndArrow: boolean;
  onClick: (e: MouseEvent<HTMLElement>) => void;
  onIconClick: () => void;
  onArrowClick: (e: MouseEvent<HTMLElement>) => void;
  onDropdownClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  onClose: () => void;
  onMiniHover: (e: MouseEvent<HTMLElement>) => void;
  onMiniLeave: () => void;
  children: ReactNode;
}

function NavCollapseVerticalButton({
  menu,
  level,
  drawerOpen,
  isSelected,
  isItemOpen,
  miniMenuOpened,
  anchorEl,
  anchorElCollapse,
  colors,
  menuIcon,
  pl,
  showTextAndArrow,
  onClick,
  onIconClick,
  onArrowClick,
  onDropdownClick,
  onClose,
  onMiniHover,
  onMiniLeave,
  children
}: NavCollapseVerticalButtonProps) {
  return (
    <ListItemButton
      id={`${menu.id}-button`}
      selected={isSelected}
      {...(!drawerOpen && { onMouseEnter: onMiniHover, onMouseLeave: onMiniLeave })}
      onClick={onClick}
      sx={(theme) => ({
        pl,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen &&
          level === 1 && {
            mx: 1.25,
            my: 0.5,
            borderRadius: 1,
            '&:hover': { bgcolor: 'secondary.200', ...theme.applyStyles('dark', { bgcolor: 'divider' }) }
          }),
        ...(!drawerOpen && {
          px: 2.75,
          '&:hover': { bgcolor: 'transparent' },
          '&.Mui-selected': {
            '&:hover': { bgcolor: 'transparent' },
            bgcolor: 'transparent'
          }
        })
      })}
      {...((drawerOpen &&
        menu.isDropdown && {
          'aria-controls': anchorElCollapse ? `${menu.id}-menu` : undefined,
          'aria-haspopup': true,
          'aria-expanded': anchorElCollapse ? 'true' : undefined,
          onClick: onDropdownClick
        }) as any)}
    >
      <NavCollapseItemIcon
        icon={menuIcon}
        drawerOpen={drawerOpen}
        isSelected={isSelected || miniMenuOpened}
        onClick={onIconClick}
        lightColor={colors.light}
        darkColor={colors.dark}
      />

      <NavCollapseLabel
        show={showTextAndArrow}
        title={menu.title}
        caption={menu.caption}
        isSelected={isSelected || miniMenuOpened}
        lightColor={colors.light}
        darkColor={colors.dark}
      />

      {showTextAndArrow && (
        <NavCollapseArrow
          hasUrl={Boolean(menu?.url)}
          isOpen={isItemOpen}
          isMiniOpened={miniMenuOpened}
          onArrowClick={onArrowClick}
          lightColor={colors.light}
          darkColor={colors.dark}
        />
      )}

      {!drawerOpen && (
        <NavCollapseMiniPopper open={miniMenuOpened} anchorEl={anchorEl} onClose={onClose}>
          {children}
        </NavCollapseMiniPopper>
      )}
    </ListItemButton>
  );
}

interface Props {
  menu: NavItemType;
  level: number;
  setSelectedItems: Dispatch<SetStateAction<string | undefined>>;
  selectedItems: string | undefined;
  setSelectedLevel: Dispatch<SetStateAction<number>>;
  selectedLevel: number;
  navCollapse: ReactNode;
}

export default function NavCollapseVertical({
  menu,
  level,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel,
  navCollapse
}: Props) {
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const isMatchedRoute = useMenuCollapse(menu, pathname);

  const [open, setOpen] = useState<boolean>(isMatchedRoute);
  const [selected, setSelected] = useState<string | null | undefined>(isMatchedRoute ? menu.id : null);
  const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);
  const [anchorElCollapse, setAnchorElCollapse] = useState<null | HTMLElement>(null);

  const miniMenuOpened = Boolean(anchorEl);
  const isLevelActive = !selectedItems || selectedItems === menu.id || level !== selectedLevel;
  const isSelected = Boolean((selected === menu.id || isMatchedRoute) && isLevelActive);
  const isItemOpen = Boolean((open || isMatchedRoute) && isLevelActive);
  const showTextAndArrow = drawerOpen || (!drawerOpen && level !== 1);

  const colors = getMenuColors(isSelected || miniMenuOpened);
  const menuIcon = getMenuIcon(menu, level, drawerOpen);
  const pl = getListItemPadding(level, drawerOpen);

  const handleClick = (event: MouseEvent<HTMLElement> | undefined, isRedirect: boolean) => {
    setAnchorEl(null);
    setSelectedLevel(level);
    if (drawerOpen) {
      const nextOpen = !isItemOpen;
      setOpen(nextOpen);
      setSelected(nextOpen ? menu.id : null);
      setSelectedItems(nextOpen ? menu.id : '');
      if (menu.url && isRedirect) navigation({ to: menu.url as any });
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handlerIconLink = () => {
    if (!drawerOpen) {
      if (menu.url) navigation({ to: menu.url as any });
      setSelected(menu.id);
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (!miniMenuOpened && !menu.url) setSelected(null);
    setAnchorEl(null);
  };

  return (
    <>
      <NavCollapseVerticalButton
        menu={menu}
        level={level}
        drawerOpen={drawerOpen}
        isSelected={isSelected}
        isItemOpen={isItemOpen}
        miniMenuOpened={miniMenuOpened}
        anchorEl={anchorEl}
        anchorElCollapse={anchorElCollapse}
        colors={colors}
        menuIcon={menuIcon}
        pl={pl}
        showTextAndArrow={showTextAndArrow}
        onClick={(e) => handleClick(e, true)}
        onIconClick={handlerIconLink}
        onArrowClick={(event) => {
          event.stopPropagation();
          handleClick(event, false);
        }}
        onDropdownClick={(e) => setAnchorElCollapse(e.currentTarget)}
        onClose={handleClose}
        onMiniHover={(e) => handleClick(e, true)}
        onMiniLeave={() => setAnchorEl(null)}
      >
        {navCollapse}
      </NavCollapseVerticalButton>

      <NavCollapseChildren
        drawerOpen={drawerOpen}
        isDropdown={menu?.isDropdown}
        isOpen={isItemOpen}
        menuId={menu.id}
        anchorEl={anchorElCollapse}
        onClose={() => setAnchorElCollapse(null)}
        level={level}
      >
        {navCollapse}
      </NavCollapseChildren>
    </>
  );
}
