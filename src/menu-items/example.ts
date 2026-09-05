import { CloudConnection, DocumentText, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  mockClient: DocumentText,
  mockServer: CloudConnection
};

// ==============================|| MENU ITEMS - EXAMPLE PAGES ||============================== //

const exampleMenuItems: NavItemType = {
  id: 'group-example',
  title: 'group-example',
  type: 'group',
  children: [
    {
      id: 'example-home',
      title: 'example-home',
      type: 'item',
      url: '/example/home',
      icon: icons.home
    },
    {
      id: 'example-mock',
      title: 'example-mock',
      type: 'item',
      url: '/example/mock',
      icon: icons.mockClient
    },
    {
      id: 'example-mock-server',
      title: 'example-mock-server',
      type: 'item',
      url: '/example/mock-server',
      icon: icons.mockServer
    }
  ]
};

export default exampleMenuItems;
