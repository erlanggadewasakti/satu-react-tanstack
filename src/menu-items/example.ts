import { DocumentText, CloudConnection, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  mockClient: DocumentText,
  mockServer: CloudConnection
};

// ==============================|| MENU ITEMS - EXAMPLE PAGES ||============================== //

const exampleMenuItems: NavItemType = {
  id: 'group-example',
  title: 'Example & Mock',
  type: 'group',
  children: [
    {
      id: 'example-home',
      title: 'Beranda Example',
      type: 'item',
      url: '/example/home',
      icon: icons.home
    },
    {
      id: 'example-mock',
      title: 'Data Mock (Client)',
      type: 'item',
      url: '/example/mock',
      icon: icons.mockClient
    },
    {
      id: 'example-mock-server',
      title: 'Data Mock (Server)',
      type: 'item',
      url: '/example/mock-server',
      icon: icons.mockServer
    }
  ]
};

export default exampleMenuItems;
