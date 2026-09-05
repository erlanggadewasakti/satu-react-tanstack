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

// custom search shortcuts
import { CUSTOM_SEARCH_ITEMS } from './customSearchItems';
export { CUSTOM_SEARCH_ITEMS };

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
