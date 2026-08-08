import { ClipboardText, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  penilaian: ClipboardText
};

const penilaianMenuItems: NavItemType = {
  id: 'group-penilaian',
  title: 'Menu Penilaian',
  type: 'group',
  children: [
    {
      id: 'penilaian-home',
      title: 'Beranda Penilaian',
      type: 'item',
      url: '/penilaian/home',
      icon: icons.home
    }
  ]
};

export default penilaianMenuItems;
