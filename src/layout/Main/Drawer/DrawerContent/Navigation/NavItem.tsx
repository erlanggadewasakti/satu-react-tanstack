import { useLocation } from '@tanstack/react-router';
import useMediaQuery from '@mui/material/useMediaQuery';

// project-imports
import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import NavItemVertical from './NavItemVertical';
import NavItemHorizontal from './NavItemHorizontal';

// types
import { LinkTarget, NavItemType } from 'types/menu';

interface Props {
  item: NavItemType;
  level: number;
  isParents?: boolean;
  setSelectedID?: Function;
}

// ==============================|| NAVIGATION - ITEM ||============================== //

export default function NavItem({ item, level, isParents = false, setSelectedID }: Props) {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const {
    state: { menuOrientation },
    drawerOpen,
    handlerDrawerOpen
  } = useConfig();

  const itemTarget: LinkTarget = item.target ? '_blank' : '_self';

  const Icon = item.icon!;
  const itemIcon = item.icon ? (
    <Icon
      variant="Bulk"
      size={drawerOpen ? 20 : 22}
      style={{ ...(menuOrientation === MenuOrientation.HORIZONTAL && isParents && { fontSize: 20, stroke: '1.5' }) }}
    />
  ) : (
    false
  );

  const { pathname } = useLocation();
  const targetPath = item?.link ? item.link : item.url;
  const isSelected = targetPath ? pathname === targetPath || (targetPath !== '/' && pathname.startsWith(targetPath + '/')) : false;

  const iconSelectedColor = 'primary.main';

  const itemHandler = () => {
    if (downLG) handlerDrawerOpen(false);

    if (isParents && setSelectedID) {
      setSelectedID();
    }
  };

  const isVertical = menuOrientation !== MenuOrientation.HORIZONTAL || downLG;

  if (isVertical) {
    return (
      <NavItemVertical
        item={item}
        level={level}
        isSelected={isSelected}
        drawerOpen={drawerOpen}
        itemTarget={itemTarget}
        itemIcon={itemIcon}
        iconSelectedColor={iconSelectedColor}
        onItemClick={itemHandler}
      />
    );
  }

  return (
    <NavItemHorizontal
      item={item}
      level={level}
      isParents={isParents}
      isSelected={isSelected}
      drawerOpen={drawerOpen}
      itemTarget={itemTarget}
      itemIcon={itemIcon}
      iconSelectedColor={iconSelectedColor}
      onItemClick={itemHandler}
    />
  );
}
