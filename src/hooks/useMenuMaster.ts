import { useMemo } from 'react';
import useConfig from 'hooks/useConfig';
import { MenuProps } from 'types/menu';

/**
 * Hook providing menu & drawer state directly from ConfigContext.
 * Replaces legacy imperative global variable setter.
 */
export function useMenuMaster() {
  const { drawerOpen, handlerDrawerOpen } = useConfig();

  const memoizedValue = useMemo(
    () => ({
      menuMaster: {
        isDashboardDrawerOpened: drawerOpen
      } as MenuProps,
      menuMasterLoading: false,
      drawerOpen,
      handlerDrawerOpen
    }),
    [drawerOpen, handlerDrawerOpen]
  );

  return memoizedValue;
}

export { useMenuMaster as useGetMenuMaster };
export default useMenuMaster;
