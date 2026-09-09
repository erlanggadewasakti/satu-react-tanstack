import { UserProfile } from 'types/auth';
import { Role } from 'types/role';
import { NavItemType } from 'types/menu';

/**
 * Memeriksa apakah role user memenuhi syarat allowedRoles.
 * Jika allowedRoles kosong/undefined, siapapun dapat mengakses.
 * Jika user.isSuperAdmin === true, selalu diperbolehkan.
 */
export function hasRoleAccess(user: UserProfile | null | undefined, allowedRoles?: (Role | string)[]): boolean {
  if (!allowedRoles || allowedRoles.length === 0) return true;
  if (!user) return false;
  if (user.isSuperAdmin) return true;

  const userRoles = Array.isArray(user.role) ? user.role : user.role ? [user.role] : [];
  const userRoleSet = new Set<Role | string>(userRoles);
  return allowedRoles.some((role) => userRoleSet.has(role));
}

/**
 * Menyaring list menu items & children-nya secara rekursif berdasarkan hak akses role user.
 */
export function filterMenuItemsByRole(items: NavItemType[], user: UserProfile | null | undefined): NavItemType[] {
  const result: NavItemType[] = [];
  for (const item of items) {
    if (hasRoleAccess(user, (item as NavItemType & { allowedRoles?: (Role | string)[] }).allowedRoles)) {
      result.push(item.children ? { ...item, children: filterMenuItemsByRole(item.children, user) } : item);
    }
  }
  return result;
}

/**
 * Mengembalikan rute default universal /home.
 */
export function getDefaultSubAppPath(_user?: UserProfile | null): string {
  return '/home';
}
