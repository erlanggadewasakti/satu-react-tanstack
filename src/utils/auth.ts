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
  return allowedRoles.some((role) => userRoles.includes(role));
}

/**
 * Menyaring list menu items & children-nya secara rekursif berdasarkan hak akses role user.
 */
export function filterMenuItemsByRole(items: NavItemType[], user: UserProfile | null | undefined): NavItemType[] {
  return items
    .filter((item) => hasRoleAccess(user, (item as NavItemType & { allowedRoles?: (Role | string)[] }).allowedRoles))
    .map((item) => (item.children ? { ...item, children: filterMenuItemsByRole(item.children, user) } : item));
}

/**
 * Mengembalikan rute default universal /home.
 */
export function getDefaultSubAppPath(_user?: UserProfile | null): string {
  return '/home';
}

