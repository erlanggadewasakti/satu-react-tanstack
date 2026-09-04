import { useMemo } from 'react';
import useConfig from 'hooks/useConfig';
import { MenuProps } from 'types/menu';

let globalDrawerSetter: ((open: boolean) => void) | null = null;

export function registerDrawerSetter(setter: (open: boolean) => void) {
  globalDrawerSetter = setter;
}

export function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
  if (globalDrawerSetter) {
    globalDrawerSetter(isDashboardDrawerOpened);
  }
}

export function useGetMenuMaster() {
  const { drawerOpen } = useConfig();

  const memoizedValue = useMemo(
    () => ({
      menuMaster: {
        isDashboardDrawerOpened: drawerOpen
      } as MenuProps,
      menuMasterLoading: false
    }),
    [drawerOpen]
  );

  return memoizedValue;
}
