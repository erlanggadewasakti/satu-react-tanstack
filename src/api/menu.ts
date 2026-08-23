import { useMemo } from 'react';

// third-party
import { useQuery } from '@tanstack/react-query';

// project-imports
import { queryClient } from 'api/client';

// types
import { MenuProps } from 'types/menu';

const initialState: MenuProps = {
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true
};

// ==============================|| API - MENU ||============================== //

const endpoints = {
  key: 'api/menu',
  master: 'master'
};

export const menuQueryKey = [endpoints.key, endpoints.master];

export function useGetMenuMaster() {
  const { data, isLoading } = useQuery({
    queryKey: menuQueryKey,
    queryFn: () => initialState,
    initialData: initialState,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  });

  const memoizedValue = useMemo(
    () => ({
      menuMaster: (data || initialState) as MenuProps,
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerComponentDrawer(isComponentDrawerOpened: boolean) {
  // to update local state based on key

  queryClient.setQueryData<MenuProps>(menuQueryKey, (currentMenuMaster) => {
    return {
      ...(currentMenuMaster || initialState),
      isComponentDrawerOpened
    };
  });
}

export function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
  // to update local state based on key

  queryClient.setQueryData<MenuProps>(menuQueryKey, (currentMenuMaster) => {
    return {
      ...(currentMenuMaster || initialState),
      isDashboardDrawerOpened
    };
  });
}
