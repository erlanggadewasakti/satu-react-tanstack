import { ClipboardText, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';
import { Role } from 'types/role';

const icons = {
  home: Home3,
  penilaian: ClipboardText
};

const penilaianMenuItems: NavItemType = {
  id: 'group-penilaian',
  title: 'group-penilaian',
  type: 'group',
  allowedRoles: [Role.Dosen, Role.Wadek1, Role.Akademik, Role.Developer],
  children: [
    {
      id: 'penilaian-home',
      title: 'penilaian-home',
      type: 'item',
      url: '/penilaian/home',
      icon: icons.home,
      allowedRoles: [Role.Dosen, Role.Wadek1, Role.Akademik, Role.Developer]
    }
  ]
};

export default penilaianMenuItems;
