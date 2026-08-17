// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
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
  const lecturerCode = user?.lecturerCode || '';

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
        sx={(theme) => ({
          bgcolor: 'secondary.200',
          border: '1px dashed',
          borderColor: 'secondary.400',
          borderRadius: 1.5,
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          ...theme.applyStyles('dark', {
            bgcolor: 'secondary.100',
            borderColor: 'divider'
          })
        })}
      >
        <Avatar alt={user?.name || 'User Profile'} src={userPhoto} sx={{ width: 60, height: 60, borderRadius: '50%' }} />
        <Stack sx={{ alignItems: 'center', width: '100%', overflow: 'hidden' }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              fontSize: '0.75rem',
              color: 'text.primary',
              textAlign: 'center',
              width: '100%',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
          >
            {user?.name || 'Guest User'}
          </Typography>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', justifyContent: 'center', mt: 0.5, flexWrap: 'wrap', gap: 0.5 }}>
            {usernameText && (
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                  whiteSpace: 'nowrap'
                }}
              >
                {usernameText}
              </Typography>
            )}
            {lecturerCode && (
              <Chip
                label={lecturerCode}
                color="success"
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.675rem',
                  fontWeight: 600,
                  bgcolor: 'success.main',
                  color: '#fff'
                }}
              />
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
