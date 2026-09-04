import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

// project-imports
import config from 'config';
import useLocalStorage from 'hooks/useLocalStorage';
import { registerDrawerSetter } from 'api/menu';

// types
import { ConfigContextValue, ConfigStates } from 'types/config';

export interface ChildrenProps {
  children: ReactNode;
}

// ==============================||  CONFIG CONTEXT  ||============================== //

export const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

// ==============================||  CONFIG PROVIDER  ||============================== //

export function ConfigProvider({ children }: ChildrenProps) {
  const { state, setState, setField, resetState } = useLocalStorage<ConfigStates>('satu-app-config', config);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handlerDrawerOpen = useCallback((open: boolean) => {
    setDrawerOpen(open);
  }, []);

  useEffect(() => {
    registerDrawerSetter(setDrawerOpen);
    return () => {
      registerDrawerSetter(() => {});
    };
  }, []);

  const memoizedValue = useMemo(
    () => ({ state, setState, setField, resetState, drawerOpen, handlerDrawerOpen }),
    [state, setField, setState, resetState, drawerOpen, handlerDrawerOpen]
  );

  return <ConfigContext.Provider value={memoizedValue}>{children}</ConfigContext.Provider>;
}
