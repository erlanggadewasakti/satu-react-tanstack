import { Book, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';
import { Role } from 'types/role';

const icons = {
  home: Home3,
  silabus: Book
};

const silabusMenuItems: NavItemType = {
  id: 'group-silabus',
  title: 'group-silabus',
  type: 'group',
  allowedRoles: [Role.Dosen, Role.KoordinatorMK, Role.Kaprodi, Role.Akademik, Role.Developer],
  children: [
    {
      id: 'silabus-home',
      title: 'silabus-home',
      type: 'item',
      url: '/silabus/home',
      icon: icons.home,
      allowedRoles: [Role.Dosen, Role.KoordinatorMK, Role.Kaprodi, Role.Akademik, Role.Developer]
    }
  ]
};

export default silabusMenuItems;
