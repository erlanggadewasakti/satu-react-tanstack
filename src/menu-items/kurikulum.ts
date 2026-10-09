import { Home3, Teacher } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';
import { Role } from 'types/role';

const icons = {
  home: Home3,
  kurikulum: Teacher
};

const kurikulumMenuItems: NavItemType = {
  id: 'group-kurikulum',
  title: 'group-kurikulum',
  type: 'group',
  allowedRoles: [Role.Akademik, Role.Kaprodi, Role.BAA, Role.Developer],
  children: [
    {
      id: 'kurikulum-home',
      title: 'kurikulum-home',
      type: 'item',
      url: '/kurikulum/home',
      icon: icons.home,
      allowedRoles: [Role.Akademik, Role.Kaprodi, Role.BAA, Role.Developer]
    }
  ]
};

export default kurikulumMenuItems;
