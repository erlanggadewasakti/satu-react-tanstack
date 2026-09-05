import { Dispatch, SetStateAction } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';

// project-imports
import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import NavItem from './NavItem';
import NavCollapseHorizontal from './NavCollapseHorizontal';
import NavCollapseVertical from './NavCollapseVertical';

// types
import { NavItemType } from 'types/menu';

// ==============================|| NAVIGATION - COLLAPSE ||============================== //

interface Props {
  menu: NavItemType;
  level: number;
  parentId: string;
  setSelectedItems: Dispatch<SetStateAction<string | undefined>>;
  selectedItems: string | undefined;
  setSelectedLevel: Dispatch<SetStateAction<number>>;
  selectedLevel: number;
}

export default function NavCollapse({
  menu,
  level,
  parentId,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel
}: Props) {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const {
    state: { menuOrientation }
  } = useConfig();

  const navCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            menu={item}
            level={level + 1}
            parentId={parentId}
          />
        );
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Collapse or Item
          </Typography>
        );
    }
  });

  const isVertical = menuOrientation !== MenuOrientation.HORIZONTAL || downLG;

  if (isVertical) {
    return (
      <NavCollapseVertical
        menu={menu}
        level={level}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
        setSelectedLevel={setSelectedLevel}
        selectedLevel={selectedLevel}
        navCollapse={navCollapse}
      />
    );
  }

  return <NavCollapseHorizontal menu={menu} level={level} navCollapse={navCollapse} />;
}
