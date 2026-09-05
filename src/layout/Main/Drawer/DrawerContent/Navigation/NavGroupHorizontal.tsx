import { Activity, Fragment, MouseEvent, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper, { PopperProps } from '@mui/material/Popper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// project-imports
import SimpleBar from 'components/third-party/SimpleBar';
import Transitions from 'components/@extended/Transitions';
import SafeFormattedMessage from 'components/@extended/SafeFormattedMessage';
import NavCollapse from './NavCollapse';
import NavItem from './NavItem';

// assets
import { More2 } from 'iconsax-reactjs';

// types
import { NavItemType } from 'types/menu';

const PopperStyled = styled((props: PopperProps) => <Popper {...props} />)(({ theme }) => ({
  overflow: 'visible',
  zIndex: 1202,
  minWidth: 180,
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 5,
    left: 32,
    width: 12,
    height: 12,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 120,
    borderWidth: '6px',
    borderStyle: 'solid',
    borderColor: `${theme.vars.palette.background.paper}  transparent transparent ${theme.vars.palette.background.paper}`,
    borderLeft: `1px solid ${theme.vars.palette.divider}`,
    borderTop: `1px solid ${theme.vars.palette.divider}`
  }
}));

interface NavGroupHorizontalProps {
  item: NavItemType;
  currentItem: NavItemType;
  isSelected: boolean;
  lastItemId: string;
  remItems: NavItemType[];
  setSelectedItems: (val: any) => void;
  setSelectedLevel: (val: any) => void;
  selectedLevel: number;
  selectedItems: any;
}

export default function NavGroupHorizontal({
  item,
  currentItem,
  isSelected,
  lastItemId,
  remItems,
  setSelectedItems,
  setSelectedLevel,
  selectedLevel,
  selectedItems
}: NavGroupHorizontalProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMini = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement> | undefined) => {
    if (!openMini) {
      setAnchorEl(event?.currentTarget ?? null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Icon = currentItem?.icon;
  const itemIcon = Icon ? (
    <Box component="span" sx={{ color: isSelected || anchorEl ? 'primary.main' : 'secondary.main' }}>
      <Icon variant="Bulk" size={22} />
    </Box>
  ) : null;

  const popperId = openMini ? `group-pop-${item.id}` : undefined;

  return (
    <List>
      <ListItemButton
        selected={isSelected}
        sx={{ p: 1, px: 1.5, my: 0.5, mr: 1, display: 'flex', alignItems: 'center', borderRadius: 1 }}
        onMouseEnter={handleClick}
        onClick={handleClick}
        onMouseLeave={handleClose}
        disableTouchRipple
        aria-describedby={popperId}
        className={anchorEl ? 'Mui-selected' : ''}
      >
        <Activity mode={itemIcon ? 'visible' : 'hidden'}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            {currentItem.id === lastItemId ? <More2 size={22} variant="Bulk" /> : itemIcon}
          </ListItemIcon>
        </Activity>
        <ListItemText
          sx={{ mr: 1 }}
          primary={
            <Typography
              variant="h6"
              sx={(theme) => ({
                fontWeight: isSelected || anchorEl ? 500 : 400,
                color: 'secondary.main',
                ...theme.applyStyles('dark', { color: 'secondary.400' }),
                ...((isSelected || anchorEl) && { color: 'primary.main' })
              })}
            >
              <SafeFormattedMessage id={currentItem.id === lastItemId ? 'more-items' : currentItem.title} />
            </Typography>
          }
        />
        <Activity mode={anchorEl ? 'visible' : 'hidden'}>
          <PopperStyled id={popperId} open={openMini} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 2001 }}>
            {({ TransitionProps }) => (
              <Transitions in={openMini} {...TransitionProps}>
                <Paper
                  sx={(theme) => ({
                    mt: 0.5,
                    py: 1.25,
                    boxShadow: theme.vars.customShadows.z1,
                    border: '1px solid ',
                    borderColor: 'divider',
                    backgroundImage: 'none'
                  })}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <SimpleBar sx={{ minWidth: 200, overflowY: 'auto', maxHeight: 'calc(100vh - 170px)' }}>
                      {currentItem.id !== lastItemId
                        ? currentItem.children?.map((menu: NavItemType) => {
                            if (menu.type === 'collapse') {
                              return (
                                <NavCollapse
                                  key={menu.id}
                                  menu={menu}
                                  level={1}
                                  parentId={currentItem.id!}
                                  setSelectedItems={setSelectedItems}
                                  setSelectedLevel={setSelectedLevel}
                                  selectedLevel={selectedLevel}
                                  selectedItems={selectedItems}
                                />
                              );
                            }
                            if (menu.type === 'item') {
                              return <NavItem key={menu.id} item={menu} level={1} />;
                            }
                            return null;
                          })
                        : remItems.map((itemRem: NavItemType) => (
                            <Fragment key={itemRem.id || itemRem.url || `rem-item-${itemRem.title || 'sub'}`}>
                              {itemRem.url ? (
                                <NavItem item={itemRem} level={1} />
                              ) : (
                                itemRem.title && (
                                  <Typography variant="caption" sx={{ pl: 2 }}>
                                    {itemRem.title} {itemRem.url}
                                  </Typography>
                                )
                              )}
                              {itemRem?.elements?.map((menu) => {
                                if (menu.type === 'collapse') {
                                  return (
                                    <NavCollapse
                                      key={menu.id}
                                      menu={menu}
                                      level={1}
                                      parentId={currentItem.id!}
                                      setSelectedItems={setSelectedItems}
                                      setSelectedLevel={setSelectedLevel}
                                      selectedLevel={selectedLevel}
                                      selectedItems={selectedItems}
                                    />
                                  );
                                }
                                if (menu.type === 'item') {
                                  return <NavItem key={menu.id} item={menu} level={1} />;
                                }
                                return null;
                              })}
                            </Fragment>
                          ))}
                    </SimpleBar>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </PopperStyled>
        </Activity>
      </ListItemButton>
    </List>
  );
}
