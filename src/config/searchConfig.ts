import { ElementType } from 'react';
import { SUB_APPS } from './subApps';
import { menuItemsBySubApp, globalHomeMenuItem, globalMockMenuItem, globalMockServerMenuItem } from 'menu-items';
import support from 'menu-items/support';
import { hasRoleAccess, filterMenuItemsByRole } from 'utils/auth';
import { UserProfile } from 'types/auth';
import { NavItemType } from 'types/menu';
import { Role } from 'types/role';

// assets
import { Home3, DocumentText, CloudConnection, Profile } from 'iconsax-reactjs';

// ==============================|| SEARCH CONFIG - TYPES ||============================== //

export interface SearchableItem {
  id: string;
  title: string;
  subTitle?: string;
  category?: string;
  subAppId?: string;
  subAppName?: string;
  url: string;
  icon?: ElementType | any;
  keywords?: string[];
  description?: string;
  allowedRoles?: Role[];
  external?: boolean;
  target?: boolean;
}

// ==============================|| CUSTOM SEARCH ITEMS (EASY TO MANAGE) ||============================== //
/**
 * Developer-friendly array to easily add custom search shortcuts, quick actions,
 * documentation links, or external tools to the Fuse.js search engine.
 */
export const CUSTOM_SEARCH_ITEMS: SearchableItem[] = [
  {
    id: 'quick-home',
    title: 'Beranda Utama LENS',
    subTitle: 'Halaman Beranda Universal',
    category: 'GENERAL',
    url: '/home',
    icon: Home3,
    keywords: ['beranda', 'home', 'dashboard', 'lens', 'utama', 'portal'],
    description: 'Akses cepat ke portal beranda utama LENS'
  },
  {
    id: 'quick-mock-client',
    title: 'Data Mock (Client-side Query)',
    subTitle: 'Mock Data TanStack Query',
    category: 'DEVELOPER & TESTING',
    url: '/mock',
    icon: DocumentText,
    keywords: ['mock', 'client', 'tanstack query', 'dummy data', 'test', 'offline data'],
    description: 'Halaman pengujian data mock di sisi client dengan TanStack Query'
  },
  {
    id: 'quick-mock-server',
    title: 'Data Mock (Server-side API)',
    subTitle: 'Mock Server Endpoint',
    category: 'DEVELOPER & TESTING',
    url: '/mock-server',
    icon: CloudConnection,
    keywords: ['mock', 'server', 'nitro api', 'endpoint', 'backend mock', 'rest api'],
    description: 'Halaman pengujian API server mock dengan Nitro server route'
  },
  {
    id: 'quick-student-profile',
    title: 'Profil Pengguna',
    subTitle: 'Informasi Akun & Data Pribadi',
    category: 'USER & PROFILE',
    url: '/home',
    icon: Profile,
    keywords: ['profile', 'akun', 'user', 'biodata', 'mahasiswa', 'dosen', 'identitas'],
    description: 'Lihat informasi profil dan detail identitas pengguna'
  }
];

// ==============================|| MENU FLATTENER & EXTRACTOR ||============================== //

function flattenMenu(items: NavItemType[], subAppId?: string, subAppName?: string, currentCategory: string = 'MENU'): SearchableItem[] {
  const result: SearchableItem[] = [];

  for (const item of items) {
    const category = item.type === 'group' ? item.title || currentCategory : currentCategory;

    if (item.type === 'item' && item.url && item.url !== '#') {
      result.push({
        id: item.id || `menu-${Math.random()}`,
        title: item.title || '',
        subTitle: item.caption || subAppName,
        category: category.toUpperCase(),
        subAppId,
        subAppName,
        url: item.url,
        icon: item.icon,
        keywords: [item.title?.toLowerCase() || '', category.toLowerCase(), subAppName?.toLowerCase() || '', subAppId || ''].filter(
          Boolean
        ),
        external: item.external,
        target: item.target
      });
    }

    if (item.children && item.children.length > 0) {
      result.push(...flattenMenu(item.children, subAppId, subAppName, category));
    }
  }

  return result;
}

// ==============================|| GET ALL SEARCHABLE ITEMS ||============================== //

/**
 * Aggregates all navigation menus across all sub-applications, global items,
 * and custom search entries, filtered by the current user's role permissions.
 */
export function getAllSearchableItems(user?: UserProfile | null): SearchableItem[] {
  const allItems: SearchableItem[] = [];
  const addedIds = new Set<string>();

  // 1. Add Universal Global Items
  const globalItems: NavItemType[] = [globalHomeMenuItem, globalMockMenuItem, globalMockServerMenuItem];
  const flattenedGlobal = flattenMenu(globalItems, undefined, 'LENS Global', 'GENERAL');
  for (const item of flattenedGlobal) {
    if (!addedIds.has(item.id)) {
      addedIds.add(item.id);
      allItems.push(item);
    }
  }

  // 2. Add Items from all Sub-Apps the user has access to
  for (const subApp of SUB_APPS) {
    if (user && !hasRoleAccess(user, subApp.allowedRoles)) {
      continue;
    }

    const appMenu = menuItemsBySubApp[subApp.id];
    if (appMenu?.items) {
      const filteredItems = filterMenuItemsByRole(appMenu.items, user);
      const flattened = flattenMenu(filteredItems, subApp.id, subApp.name, subApp.name);
      for (const item of flattened) {
        if (!addedIds.has(item.id)) {
          addedIds.add(item.id);
          allItems.push(item);
        }
      }
    }
  }

  // 3. Add Support & Other menus
  const supportItems = filterMenuItemsByRole([support], user);
  const flattenedSupport = flattenMenu(supportItems, undefined, 'Bantuan & Lainnya', 'SUPPORT');
  for (const item of flattenedSupport) {
    if (!addedIds.has(item.id)) {
      addedIds.add(item.id);
      allItems.push(item);
    }
  }

  // 4. Add Custom Search Items (filtered if allowedRoles defined)
  for (const customItem of CUSTOM_SEARCH_ITEMS) {
    if (customItem.allowedRoles && user && !hasRoleAccess(user, customItem.allowedRoles)) {
      continue;
    }
    if (!addedIds.has(customItem.id)) {
      addedIds.add(customItem.id);
      allItems.push(customItem);
    }
  }

  return allItems;
}
