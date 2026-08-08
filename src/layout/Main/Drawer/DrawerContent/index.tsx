// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';

// project-imports
import { useGetMenuMaster } from 'api/menu';
import SimpleBar from 'components/third-party/SimpleBar';
import SubAppSelector from 'components/SubAppSelector';
import DrawerHeader from '../DrawerHeader';
import Navigation from './Navigation';
import UserProfileCard from './UserProfileCard';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  return (
    <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' }, height: '100%' }}>
      <DrawerHeader open={drawerOpen} />
      <SubAppSelector collapsed={!drawerOpen} />
      <UserProfileCard />
      <Navigation />
    </SimpleBar>
  );
}
