import { ChartCircle, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';
import { Role } from 'types/role';

const icons = {
  home: Home3,
  portofolio: ChartCircle
};

const portofolioMenuItems: NavItemType = {
  id: 'group-portofolio',
  title: 'group-portofolio',
  type: 'group',
  allowedRoles: [Role.Kaprodi, Role.Warek, Role.Wadek1, Role.Akademik, Role.Developer],
  children: [
    {
      id: 'portofolio-home',
      title: 'portofolio-home',
      type: 'item',
      url: '/portofolio/home',
      icon: icons.home,
      allowedRoles: [Role.Kaprodi, Role.Warek, Role.Wadek1, Role.Akademik, Role.Developer]
    }
  ]
};

export default portofolioMenuItems;
