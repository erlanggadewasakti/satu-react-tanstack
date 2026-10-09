import { Home3, UserSquare } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';
import { Role } from 'types/role';

const icons = {
  home: Home3,
  akademikAdmin: UserSquare
};

const akademikAdminMenuItems: NavItemType = {
  id: 'group-akademik-admin',
  title: 'group-akademik-admin',
  type: 'group',
  allowedRoles: [Role.Akademik, Role.BAA, Role.Developer],
  children: [
    {
      id: 'akademik-admin-home',
      title: 'akademik-admin-home',
      type: 'item',
      url: '/akademik-admin/home',
      icon: icons.home,
      allowedRoles: [Role.Akademik, Role.BAA, Role.Developer]
    }
  ]
};

export default akademikAdminMenuItems;
