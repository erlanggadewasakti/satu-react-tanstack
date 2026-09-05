import { globalHomeMenuItem, menuItemsBySubApp } from 'menu-items';
import support from 'menu-items/support';
import { ElementType } from 'react';
import { UserProfile } from 'types/auth';
import { NavItemType } from 'types/menu';
import { Role } from 'types/role';
import { filterMenuItemsByRole, hasRoleAccess } from 'utils/auth';
import { SUB_APPS } from './subApps';

// Locales dictionaries (used to resolve existing translations without adding new entries to json files)
import enLocales from 'utils/locales/en.json';
import idLocales from 'utils/locales/id.json';

const idDict = idLocales as Record<string, string>;
const enDict = enLocales as Record<string, string>;

// assets
import { CloudConnection, DocumentText, Home3, Profile } from 'iconsax-reactjs';

// ==============================|| SEARCH CONFIG - TYPES ||============================== //

export interface LocalizedText {
  id: string;
  en: string;
}

export type LocalizedValue = LocalizedText | string;

export interface SearchableItem {
  id: string;
  title: LocalizedValue;
  subTitle?: LocalizedValue;
  category?: LocalizedValue;
  subAppId?: string;
  subAppName?: LocalizedValue;
  url: string;
  icon?: ElementType | any;
  keywords?: string[];
  description?: LocalizedValue;
  allowedRoles?: Role[];
  external?: boolean;
  target?: boolean;
}

export function resolveLocalizedText(val?: LocalizedValue | null): LocalizedText {
  if (!val) return { id: '', en: '' };
  if (typeof val === 'string') return { id: val, en: val };
  return { id: val.id || '', en: val.en || val.id || '' };
}

// ==============================|| CUSTOM SEARCH ITEMS (EASY TO MANAGE) ||============================== //
/**
 * Developer-friendly array to easily add custom search shortcuts, quick actions,
 * documentation links, or external tools to the Fuse.js search engine.
 * Stores both Bahasa Indonesia (id) and English (en) locally without polluting locales JSON files.
 */
export const CUSTOM_SEARCH_ITEMS: SearchableItem[] = [
  {
    id: 'quick-home',
    title: {
      id: 'Beranda Utama LENS',
      en: 'LENS Main Home'
    },
    subTitle: {
      id: 'Halaman Beranda Universal',
      en: 'Universal Home Page'
    },
    description: {
      id: 'Akses cepat ke portal beranda utama LENS',
      en: 'Quick access to the main LENS home portal'
    },
    category: {
      id: 'UMUM',
      en: 'GENERAL'
    },
    url: '/home',
    icon: Home3,
    keywords: ['beranda', 'home', 'dashboard', 'lens', 'utama', 'portal', 'main', 'universal']
  },
  {
    id: 'quick-mock-client',
    title: {
      id: 'Data Mock (Client-side Query)',
      en: 'Mock Data (Client-side Query)'
    },
    subTitle: {
      id: 'Mock Data TanStack Query',
      en: 'TanStack Query Mock Data'
    },
    description: {
      id: 'Halaman pengujian data mock di sisi client dengan TanStack Query',
      en: 'Client-side mock data testing page with TanStack Query'
    },
    category: {
      id: 'PENGEMBANG & PENGUJIAN',
      en: 'DEVELOPER & TESTING'
    },
    subAppId: 'example',
    subAppName: {
      id: 'Example Pages',
      en: 'Example Pages'
    },
    url: '/example/mock',
    icon: DocumentText,
    keywords: ['mock', 'client', 'tanstack query', 'dummy data', 'test', 'offline data', 'example']
  },
  {
    id: 'quick-mock-server',
    title: {
      id: 'Data Mock (Server-side API)',
      en: 'Mock Data (Server-side API)'
    },
    subTitle: {
      id: 'Mock Server Endpoint',
      en: 'Mock Server Endpoint'
    },
    description: {
      id: 'Halaman pengujian API server mock dengan Nitro server route',
      en: 'Server-side API testing page with Nitro server routes'
    },
    category: {
      id: 'PENGEMBANG & PENGUJIAN',
      en: 'DEVELOPER & TESTING'
    },
    subAppId: 'example',
    subAppName: {
      id: 'Example Pages',
      en: 'Example Pages'
    },
    url: '/example/mock-server',
    icon: CloudConnection,
    keywords: ['mock', 'server', 'nitro api', 'endpoint', 'backend mock', 'rest api', 'example']
  },
  {
    id: 'quick-student-profile',
    title: {
      id: 'Profil Pengguna',
      en: 'User Profile'
    },
    subTitle: {
      id: 'Informasi Akun & Data Pribadi',
      en: 'Account Information & Personal Data'
    },
    description: {
      id: 'Lihat informasi profil dan detail identitas pengguna',
      en: 'View user profile information and identity details'
    },
    category: {
      id: 'PENGGUNA & PROFIL',
      en: 'USER & PROFILE'
    },
    url: '/home',
    icon: Profile,
    keywords: ['profile', 'akun', 'user', 'biodata', 'mahasiswa', 'dosen', 'identitas', 'account', 'identity']
  }
];

// ==============================|| MENU FLATTENER & EXTRACTOR ||============================== //

function flattenMenu(
  items: NavItemType[],
  subAppId?: string,
  subAppName?: LocalizedText,
  subAppDesc?: LocalizedText,
  currentCategoryKey: string = 'MENU'
): SearchableItem[] {
  const result: SearchableItem[] = [];

  for (const item of items) {
    const categoryKey = item.type === 'group' ? item.title || currentCategoryKey : currentCategoryKey;

    if (item.type === 'item' && item.url && item.url !== '#') {
      const rawTitle = item.title || '';
      const titleId = idDict[rawTitle] || rawTitle;
      const titleEn = enDict[rawTitle] || rawTitle;

      const rawCaption = item.caption || '';
      const categoryId = idDict[categoryKey] || categoryKey;
      const categoryEn = enDict[categoryKey] || categoryKey;

      let subTitleId = '';
      let subTitleEn = '';

      if (rawCaption) {
        subTitleId = idDict[rawCaption] || rawCaption;
        subTitleEn = enDict[rawCaption] || rawCaption;
      } else if (
        categoryId &&
        categoryId !== titleId &&
        categoryId !== subAppName?.id &&
        !categoryKey.startsWith('group-') &&
        !['GENERAL', 'MENU', 'SUPPORT', 'OTHERS', 'UMUM'].includes(categoryKey.toUpperCase())
      ) {
        subTitleId = categoryId;
        subTitleEn = categoryEn;
      }

      const descriptionId = subAppDesc?.id || '';
      const descriptionEn = subAppDesc?.en || '';

      const keywords = [
        titleId.toLowerCase(),
        titleEn.toLowerCase(),
        subTitleId.toLowerCase(),
        subTitleEn.toLowerCase(),
        descriptionId.toLowerCase(),
        descriptionEn.toLowerCase(),
        rawTitle.toLowerCase(),
        categoryKey.toLowerCase(),
        subAppId || ''
      ].filter(Boolean);

      result.push({
        id: item.id || `menu-${Math.random()}`,
        title: { id: titleId, en: titleEn },
        subTitle: { id: subTitleId, en: subTitleEn },
        category: { id: categoryId, en: categoryEn },
        subAppId,
        subAppName,
        url: item.url,
        icon: item.icon,
        keywords,
        description: { id: descriptionId, en: descriptionEn },
        external: item.external,
        target: item.target
      });
    }

    if (item.children && item.children.length > 0) {
      result.push(...flattenMenu(item.children, subAppId, subAppName, subAppDesc, categoryKey));
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
  const globalItems: NavItemType[] = [globalHomeMenuItem];
  const globalName: LocalizedText = { id: 'LENS Global', en: 'LENS Global' };
  const globalDesc: LocalizedText = {
    id: 'Portal akademik terpadu dan sistem informasi pembelajaran',
    en: 'Integrated academic portal and learning information system'
  };
  const flattenedGlobal = flattenMenu(globalItems, undefined, globalName, globalDesc, 'GENERAL');
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
      const subAppName: LocalizedText = {
        id: idDict[`subapp.${subApp.id}.name`] || subApp.name,
        en: enDict[`subapp.${subApp.id}.name`] || subApp.name
      };
      const subAppDesc: LocalizedText = {
        id: idDict[`subapp.${subApp.id}.desc`] || subApp.description || '',
        en: enDict[`subapp.${subApp.id}.desc`] || subApp.description || ''
      };

      const flattened = flattenMenu(filteredItems, subApp.id, subAppName, subAppDesc, `group-${subApp.id}`);
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
  const supportName: LocalizedText = { id: 'Bantuan & Lainnya', en: 'Support & Others' };
  const supportDesc: LocalizedText = {
    id: 'Bantuan sistem, panduan penggunaan, dan menu tambahan',
    en: 'System support, user guides, and additional menus'
  };
  const flattenedSupport = flattenMenu(supportItems, undefined, supportName, supportDesc, 'SUPPORT');
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
