import { Home3 } from 'iconsax-reactjs';

// project-imports
import akademikAdminMenuItems from './akademik-admin';
import exampleMenuItems from './example';
import kurikulumMenuItems from './kurikulum';
import penilaianMenuItems from './penilaian';
import perkuliahanMenuItems from './perkuliahan';
import portofolioMenuItems from './portofolio';
import silabusMenuItems from './silabus';
import superAdminMenuItems from './super-admin';

import support from './support';

// types
import { NavItemType } from 'types/menu';
import { Role } from 'types/role';

const allRoles = [
  Role.Developer,
  Role.Akademik,
  Role.BAA,
  Role.Kaprodi,
  Role.KoordinatorMK,
  Role.Dosen,
  Role.Wadek1,
  Role.Warek,
  Role.LAA,
  Role.User
];

// ==============================|| UNIVERSAL GLOBAL HOME MENU ||============================== //

export const globalHomeMenuItem: NavItemType = {
  id: 'global-home',
  title: 'beranda-lens',
  type: 'group',
  allowedRoles: allRoles,
  children: [
    {
      id: 'home',
      title: 'beranda-lens',
      type: 'item',
      url: '/home',
      icon: Home3,
      allowedRoles: allRoles
    }
  ]
};

// ==============================|| MENU ITEMS PER SUB-APP ||============================== //

export const menuItemsBySubApp: Record<string, { items: NavItemType[] }> = {
  'super-admin': { items: [superAdminMenuItems] },
  'akademik-admin': { items: [akademikAdminMenuItems] },
  kurikulum: { items: [kurikulumMenuItems] },
  silabus: { items: [silabusMenuItems] },
  perkuliahan: { items: [perkuliahanMenuItems] },
  penilaian: { items: [penilaianMenuItems] },
  portofolio: { items: [portofolioMenuItems] },
  example: { items: [exampleMenuItems, support] }
};

const menuItems: { items: NavItemType[]; menuItemsBySubApp: typeof menuItemsBySubApp } = {
  items: [globalHomeMenuItem, superAdminMenuItems, support],
  menuItemsBySubApp
};

export default menuItems;
