import { SecurityUser, Home3 } from 'iconsax-react';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  superAdmin: SecurityUser
};

const superAdminMenuItems: NavItemType = {
  id: 'group-super-admin',
  title: 'group-super-admin',
  type: 'group',
  children: [
    {
      id: 'super-admin-home',
      title: 'super-admin-home',
      type: 'item',
      url: '/super-admin/home',
      icon: icons.home
    }
  ]
};

export default superAdminMenuItems;
