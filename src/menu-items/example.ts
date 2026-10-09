import { CloudConnection, DocumentText, Home3 } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';
import { Role } from 'types/role';

const icons = {
  home: Home3,
  mockClient: DocumentText,
  mockServer: CloudConnection
};

const exampleRoles = [
  Role.Developer,
  Role.Akademik,
  Role.BAA,
  Role.Kaprodi,
  Role.KoordinatorMK,
  Role.Dosen,
  Role.Wadek1,
  Role.Warek,
  Role.LAA,
  Role.User
];

// ==============================|| MENU ITEMS - EXAMPLE PAGES ||============================== //

const exampleMenuItems: NavItemType = {
  id: 'group-example',
  title: 'group-example',
  type: 'group',
  allowedRoles: exampleRoles,
  children: [
    {
      id: 'example-home',
      title: 'example-home',
      type: 'item',
      url: '/example/home',
      icon: icons.home,
      allowedRoles: [ Role.Developer,]
    },
    {
      id: 'example-mock',
      title: 'example-mock',
      type: 'item',
      url: '/example/mock',
      icon: icons.mockClient,
      allowedRoles: exampleRoles
    },
    {
      id: 'example-mock-server',
      title: 'example-mock-server',
      type: 'item',
      url: '/example/mock-server',
      icon: icons.mockServer,
      allowedRoles: exampleRoles
    }
  ]
};

export default exampleMenuItems;
