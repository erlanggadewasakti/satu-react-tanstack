import { Calendar, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';
import { Role } from 'types/role';

const icons = {
  home: Home3,
  perkuliahan: Calendar
};

const perkuliahanMenuItems: NavItemType = {
  id: 'group-perkuliahan',
  title: 'group-perkuliahan',
  type: 'group',
  allowedRoles: [Role.Dosen, Role.KoordinatorMK, Role.LAA, Role.BAA, Role.Developer],
  children: [
    {
      id: 'perkuliahan-home',
      title: 'perkuliahan-home',
      type: 'item',
      url: '/perkuliahan/home',
      icon: icons.home,
      allowedRoles: [Role.Dosen, Role.KoordinatorMK, Role.LAA, Role.BAA, Role.Developer]
    }
  ]
};

export default perkuliahanMenuItems;
