import { SecurityUser, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  superAdmin: SecurityUser
};

const superAdminMenuItems: NavItemType = {
  id: 'group-super-admin',
  title: 'Menu Super Admin',
  type: 'group',
  children: [
    {
      id: 'super-admin-home',
      title: 'Beranda Super Admin',
      type: 'item',
      url: '/super-admin/home',
      icon: icons.home
    }
  ]
};

export default superAdminMenuItems;
