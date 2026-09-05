import { useMemo } from 'react';
import { NavItemType } from 'types/menu';

// ==============================|| MENU COLLAPSED - HOOK ||============================== //

export function isRouteActiveInMenu(item: NavItemType, pathname: string): boolean {
  if (item.url && pathname === (item.link || item.url)) {
    return true;
  }
  if (item.children?.length) {
    return item.children.some((child) => isRouteActiveInMenu(child, pathname));
  }
  return false;
}

/**
 * Hook to determine if any descendant item or current item matches the active pathname.
 *
 * @param {NavItemType} menu - The menu object containing items.
 * @param {string} pathname - Current route pathname.
 * @returns {boolean} Whether the menu contains the active route.
 */
export default function useMenuCollapse(menu: NavItemType, pathname: string): boolean {
  return useMemo(() => isRouteActiveInMenu(menu, pathname), [menu, pathname]);
}
