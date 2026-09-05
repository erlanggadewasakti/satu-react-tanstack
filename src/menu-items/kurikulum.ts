import { Home3, Teacher } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  kurikulum: Teacher
};

const kurikulumMenuItems: NavItemType = {
  id: 'group-kurikulum',
  title: 'group-kurikulum',
  type: 'group',
  children: [
    {
      id: 'kurikulum-home',
      title: 'kurikulum-home',
      type: 'item',
      url: '/kurikulum/home',
      icon: icons.home
    }
  ]
};

export default kurikulumMenuItems;
