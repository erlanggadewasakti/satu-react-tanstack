import { ClipboardText, Home3 } from 'iconsax-react';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  penilaian: ClipboardText
};

const penilaianMenuItems: NavItemType = {
  id: 'group-penilaian',
  title: 'group-penilaian',
  type: 'group',
  children: [
    {
      id: 'penilaian-home',
      title: 'penilaian-home',
      type: 'item',
      url: '/penilaian/home',
      icon: icons.home
    }
  ]
};

export default penilaianMenuItems;
