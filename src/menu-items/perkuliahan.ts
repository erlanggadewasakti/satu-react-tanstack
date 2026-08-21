import { Calendar, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  perkuliahan: Calendar
};

const perkuliahanMenuItems: NavItemType = {
  id: 'group-perkuliahan',
  title: 'group-perkuliahan',
  type: 'group',
  children: [
    {
      id: 'perkuliahan-home',
      title: 'perkuliahan-home',
      type: 'item',
      url: '/perkuliahan/home',
      icon: icons.home
    }
  ]
};

export default perkuliahanMenuItems;
