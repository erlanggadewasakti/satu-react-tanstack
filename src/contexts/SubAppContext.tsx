import { createContext, ReactNode, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';

// project-imports
import useLocalStorage from 'hooks/useLocalStorage';
import useAuth from 'hooks/useAuth';
import { SUB_APPS } from 'config/subApps';
import menuItems, { menuItemsBySubApp, globalHomeMenuItem } from 'menu-items';
import { hasRoleAccess, filterMenuItemsByRole } from 'utils/auth';

// types
import { SubAppContextValue } from 'types/subApp';

export interface ChildrenProps {
  children: ReactNode;
}

// ==============================|| SUB-APP CONTEXT ||============================== //

export const SubAppContext = createContext<SubAppContextValue | undefined>(undefined);

// ==============================|| SUB-APP PROVIDER ||============================== //

export function SubAppProvider({ children }: ChildrenProps) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Sub-app yang diizinkan untuk role user saat ini
  const availableSubApps = useMemo(
    () => SUB_APPS.filter((app) => hasRoleAccess(user, app.allowedRoles)),
    [user]
  );

  const defaultAppId = availableSubApps[0]?.id || SUB_APPS[0].id;
  const { state: activeAppId, setState: setActiveAppId } = useLocalStorage<string>('active-sub-app-id', defaultAppId);

  // Sync activeAppId berdasarkan rute URL saat ini atau ketersediaan role
  useEffect(() => {
    const matchedApp = SUB_APPS.find((app) => location.pathname.startsWith(app.prefix));
    if (matchedApp && matchedApp.id !== activeAppId) {
      setActiveAppId(matchedApp.id);
    } else if (availableSubApps.length > 0) {
      const isAvailable = availableSubApps.some((app) => app.id === activeAppId);
      if (!isAvailable) {
        setActiveAppId(availableSubApps[0].id);
      }
    }
  }, [location.pathname, activeAppId, availableSubApps, setActiveAppId]);

  const activeSubApp = useMemo(
    () => SUB_APPS.find((app) => app.id === activeAppId) || availableSubApps[0] || SUB_APPS[0],
    [activeAppId, availableSubApps]
  );

  // Handler ganti sub-app -> redirect ke /<prefix>/home
  const changeSubApp = (subAppId: string) => {
    const targetApp = availableSubApps.find((app) => app.id === subAppId);
    if (targetApp) {
      setActiveAppId(targetApp.id);
      navigate({ to: `${targetApp.prefix}/home` as any });
    }
  };

  // Menu items sesuai activeSubApp + Home global di urutan teratas
  const currentMenuItems = useMemo(() => {
    const appMenu = menuItemsBySubApp[activeSubApp.id];
    const rawItems = appMenu?.items || menuItems.items || [];
    const filteredSubAppMenu = filterMenuItemsByRole(rawItems, user);
    return [globalHomeMenuItem, ...filteredSubAppMenu];
  }, [activeSubApp.id, user]);

  const memoizedValue = useMemo(
    () => ({
      activeSubApp,
      subApps: availableSubApps,
      changeSubApp,
      menuItems: currentMenuItems
    }),
    [activeSubApp, availableSubApps, currentMenuItems]
  );

  return <SubAppContext.Provider value={memoizedValue}>{children}</SubAppContext.Provider>;
}

