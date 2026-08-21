import { Book, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  silabus: Book
};

const silabusMenuItems: NavItemType = {
  id: 'group-silabus',
  title: 'group-silabus',
  type: 'group',
  children: [
    {
      id: 'silabus-home',
      title: 'silabus-home',
      type: 'item',
      url: '/silabus/home',
      icon: icons.home
    }
  ]
};

export default silabusMenuItems;
