import { Home3, SecurityUser } from 'iconsax-reactjs';
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
