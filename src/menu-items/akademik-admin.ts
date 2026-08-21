import { UserSquare, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  akademikAdmin: UserSquare
};

const akademikAdminMenuItems: NavItemType = {
  id: 'group-akademik-admin',
  title: 'group-akademik-admin',
  type: 'group',
  children: [
    {
      id: 'akademik-admin-home',
      title: 'akademik-admin-home',
      type: 'item',
      url: '/akademik-admin/home',
      icon: icons.home
    }
  ]
};

export default akademikAdminMenuItems;
