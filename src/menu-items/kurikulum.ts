import { Teacher, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  kurikulum: Teacher
};

const kurikulumMenuItems: NavItemType = {
  id: 'group-kurikulum',
  title: 'Menu Kurikulum',
  type: 'group',
  children: [
    {
      id: 'kurikulum-home',
      title: 'Beranda Kurikulum',
      type: 'item',
      url: '/kurikulum/home',
      icon: icons.home
    }
  ]
};

export default kurikulumMenuItems;
