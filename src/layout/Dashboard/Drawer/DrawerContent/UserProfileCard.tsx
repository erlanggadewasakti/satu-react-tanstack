// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from 'components/@extended/Avatar';

// project-imports
import { useGetMenuMaster } from 'api/menu';
import useAuth from 'hooks/useAuth';

// assets
import defaultAvatar from 'assets/images/users/avatar-6.png';

// ==============================|| DRAWER CONTENT - USER PROFILE CARD ||============================== //

export default function UserProfileCard() {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const { user } = useAuth();

  const userPhoto = user?.photo && user.photo !== '-' ? user.photo : defaultAvatar;
  const usernameText = user?.username ? `@${user.username}` : '';
  const lecturerCodeText = user?.lecturerCode ? `Kode: ${user.lecturerCode}` : '';

  const detailsText = [usernameText, lecturerCodeText].filter(Boolean).join(' | ');

  if (!drawerOpen) {
    return (
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
        <Avatar alt={user?.name || 'User Profile'} src={userPhoto} sx={{ width: 42, height: 42 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 1, px: 2 }}>
      <Box
        sx={{
          bgcolor: '#f3f5f7',
          border: '1px solid',
          borderColor: '#dbe0e5',
          borderRadius: 1.5,
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Avatar alt={user?.name || 'User Profile'} src={userPhoto} sx={{ width: 60, height: 60, borderRadius: '50%' }} />
        <Stack sx={{ alignItems: 'center', width: '100%', overflow: 'hidden' }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              fontSize: '0.75rem',
              color: '#1d2630',
              textAlign: 'center',
              width: '100%',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
          >
            {user?.name || 'Guest User'}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.75rem',
              color: '#5b6b79',
              textAlign: 'center',
              width: '100%',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
          >
            {detailsText || 'No details available'}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
