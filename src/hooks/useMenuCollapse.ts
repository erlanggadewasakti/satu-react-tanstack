import { useEffect, Dispatch, SetStateAction } from 'react';

// types
import { NavItemType } from 'types/menu';

type SetState<T> = (value: T | null) => void;

function setParentOpenedMenu(
  items: NavItemType[],
  pathname: string,
  menuId: string | undefined,
  setSelected: SetState<string | null>,
  setOpen: Dispatch<SetStateAction<boolean>>
): void {
  for (const item of items) {
    // Recursively check child menus
    if (item.children?.length) {
      setParentOpenedMenu(item.children, pathname, menuId, setSelected, setOpen);
    }

    // Check if the current menu item matches the pathname
    if ((item.link && (pathname === item.link || (item.link !== '/' && pathname.startsWith(item.link + '/')))) || item.url === pathname) {
      setSelected(menuId ?? null); // Select the parent menu
      setOpen(true); // Open the menu
    }
  }
}

// ==============================|| MENU COLLAPSED - HOOK ||============================== //

/**
 * Hook to handle menu collapse behavior based on the current route.
 * Automatically expands the parent menu of the active route item.
 *
 * @param {NavItemType} menu - The menu object containing items.
 * @param {string} pathname - Current route pathname.
 * @param {boolean} miniMenuOpened - Flag indicating if the mini menu is open.
 * @param {SetState<string | null>} setSelected - Function to update selected menu state.
 * @param {Dispatch<SetStateAction<boolean>>} setOpen - Function to update menu open state.
 * @param {SetState<HTMLElement>} setAnchorEl - Function to update the anchor element state.
 */

export default function useMenuCollapse(
  menu: NavItemType,
  pathname: string,
  miniMenuOpened: boolean,
  setSelected: SetState<string | null>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setAnchorEl: SetState<HTMLElement>
): void {
  useEffect(() => {
    setOpen(false); // Close the menu initially
    !miniMenuOpened ? setSelected(null) : setAnchorEl(null); // Reset selection based on menu state

    // If menu has children, determine which should be opened
    if (menu.children?.length) {
      setParentOpenedMenu(menu.children, pathname, menu.id, setSelected, setOpen);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menu.children]);
}
