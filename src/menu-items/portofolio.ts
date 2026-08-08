import { ChartCircle, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  portofolio: ChartCircle
};

const portofolioMenuItems: NavItemType = {
  id: 'group-portofolio',
  title: 'Menu Portofolio',
  type: 'group',
  children: [
    {
      id: 'portofolio-home',
      title: 'Beranda Portofolio',
      type: 'item',
      url: '/portofolio/home',
      icon: icons.home
    }
  ]
};

export default portofolioMenuItems;
