import { UserSquare, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  akademikAdmin: UserSquare
};

const akademikAdminMenuItems: NavItemType = {
  id: 'group-akademik-admin',
  title: 'Menu Akademik Admin',
  type: 'group',
  children: [
    {
      id: 'akademik-admin-home',
      title: 'Beranda Akademik Admin',
      type: 'item',
      url: '/akademik-admin/home',
      icon: icons.home
    }
  ]
};

export default akademikAdminMenuItems;
