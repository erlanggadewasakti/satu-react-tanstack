import { ChartCircle, Home3 } from 'iconsax-react';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  portofolio: ChartCircle
};

const portofolioMenuItems: NavItemType = {
  id: 'group-portofolio',
  title: 'group-portofolio',
  type: 'group',
  children: [
    {
      id: 'portofolio-home',
      title: 'portofolio-home',
      type: 'item',
      url: '/portofolio/home',
      icon: icons.home
    }
  ]
};

export default portofolioMenuItems;
