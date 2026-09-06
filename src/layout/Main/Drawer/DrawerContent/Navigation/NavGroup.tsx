import { useLocation } from '@tanstack/react-router';
import { useMemo } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project-imports
import { useGetMenuMaster } from 'api/menu';
import SafeFormattedMessage from 'components/@extended/SafeFormattedMessage';
import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import NavCollapse from './NavCollapse';
import NavGroupHorizontal from './NavGroupHorizontal';
import NavItem from './NavItem';

// types
import { NavItemType } from 'types/menu';

interface Props {
  item: NavItemType;
  lastItem: number;
  remItems: NavItemType[];
  lastItemId: string;
  selectedID: string | undefined;
  setSelectedID: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedItems: (val: any) => void;
  selectedItems: any;
  setSelectedLevel: (val: any) => void;
  selectedLevel: number;
}

function hasActiveRoute(item: NavItemType, pathname: string): boolean {
  if (item.url && pathname === (item.link || item.url)) {
    return true;
  }
  if (item.children?.length) {
    return item.children.some((child) => hasActiveRoute(child, pathname));
  }
  return false;
}

// ==============================|| NAVIGATION - GROUP ||============================== //

export default function NavGroup({
  item,
  lastItem,
  remItems,
  lastItemId,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel
}: Props) {
  const { pathname } = useLocation();

  const {
    state: { menuOrientation, menuCaption }
  } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const currentItem: NavItemType = useMemo(() => {
    if (lastItem && item.id === lastItemId) {
      const localItem: NavItemType = { ...item };
      const elements = remItems.map((ele: NavItemType) => ele.elements);
      localItem.children = elements.flat(1) as NavItemType[];
      return localItem;
    }
    return item;
  }, [item, lastItem, lastItemId, remItems]);

  const isSelected = useMemo(() => hasActiveRoute(currentItem, pathname), [currentItem, pathname]);

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  if (isHorizontal) {
    return (
      <NavGroupHorizontal
        item={item}
        currentItem={currentItem}
        isSelected={isSelected}
        lastItemId={lastItemId}
        remItems={remItems}
        setSelectedItems={setSelectedItems}
        setSelectedLevel={setSelectedLevel}
        selectedLevel={selectedLevel}
        selectedItems={selectedItems}
      />
    );
  }

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={menuItem.id}
            menu={menuItem}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            level={1}
            parentId={currentItem.id!}
          />
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id || `group-fix-${menuItem.title || menuItem.type}`} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title ? (
          drawerOpen &&
          menuCaption && (
            <Box sx={{ pl: 3, mb: 1.5 }}>
              <Typography
                variant="overline"
                sx={(theme) => ({
                  display: 'block',
                  color: 'secondary.dark',
                  ...theme.applyStyles('dark', { color: 'text.secondary' })
                })}
              >
                <SafeFormattedMessage id={item.title} />
              </Typography>
              {item.caption && (
                <Typography variant="caption" component="span" color="text.secondary" sx={{ display: 'block' }}>
                  <SafeFormattedMessage id={item.caption} />
                </Typography>
              )}
            </Box>
          )
        ) : (
          <Divider sx={{ my: 0.5 }} />
        )
      }
      sx={{ mt: drawerOpen && menuCaption && item.title ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
}
