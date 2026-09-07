// project-imports
import useConfig from 'hooks/useConfig';
import SimpleBar from 'components/third-party/SimpleBar';
import SubAppSelector from 'components/SubAppSelector';
import DrawerHeader from '../DrawerHeader';
import Navigation from './Navigation';
import UserProfileCard from './UserProfileCard';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  const { drawerOpen } = useConfig();

  return (
    <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' }, height: '100%' }}>
      <DrawerHeader open={drawerOpen} />
      <UserProfileCard />
      <SubAppSelector collapsed={!drawerOpen} />
      <Navigation />
    </SimpleBar>
  );
}
