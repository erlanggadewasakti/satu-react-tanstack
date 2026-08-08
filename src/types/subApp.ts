import { NavItemType } from './menu';
import { Role } from './role';

export interface SubAppConfig {
  id: string;
  name: string;
  prefix: string;
  defaultRoute: string;
  description?: string;
  allowedRoles?: (Role | string)[];
}

export interface SubAppContextValue {
  activeSubApp: SubAppConfig;
  subApps: SubAppConfig[];
  changeSubApp: (subAppId: string) => void;
  menuItems: NavItemType[];
}
