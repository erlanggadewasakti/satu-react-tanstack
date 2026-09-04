import { useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FormattedMessage } from 'react-intl';

// material-ui
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import Avatar from 'components/@extended/Avatar';
import Transitions from 'components/@extended/Transitions';
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';

// assets
import defaultAvatar from 'assets/images/users/avatar-6.png';
import { Logout } from 'iconsax-reactjs';

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate({ to: '/login' });
    } catch (err) {
      console.error(err);
    }
  };

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const userRoles = Array.isArray(user?.role) ? user.role : user?.role ? [user.role] : [];

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={(theme) => ({
          p: 0.25,
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter', ...theme.applyStyles('dark', { bgcolor: 'secondary.light' }) },
          '&:focus-visible': {
            outline: `2px solid ${theme.vars.palette.secondary.dark}`,
            outlineOffset: 2
          }
        })}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar alt={user?.name || 'profile user'} src={user?.photo && user.photo !== '-' ? user.photo : defaultAvatar} />
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [0, 9] } }] }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper
              sx={(theme) => ({
                boxShadow: theme.vars.customShadows.z1,
                width: 290,
                minWidth: 240,
                maxWidth: 290,
                [theme.breakpoints.down('md')]: { maxWidth: 260 },
                borderRadius: 1.5
              })}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 2.5, pb: 2 }}>
                    <Stack spacing={1.5}>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                        <Avatar
                          alt={user?.name || 'profile user'}
                          src={user?.photo && user.photo !== '-' ? user.photo : defaultAvatar}
                          sx={{ width: 44, height: 44 }}
                        />
                        <Stack sx={{ overflow: 'hidden' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3 }} noWrap>
                            {user?.name || <FormattedMessage id="profile.guest" />}
                          </Typography>
                          {user?.username && (
                            <Typography variant="caption" color="secondary" sx={{ fontSize: '0.75rem' }} noWrap>
                              {`@${user.username}`}
                            </Typography>
                          )}
                        </Stack>
                      </Stack>

                      {user?.email && (
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {user.email}
                        </Typography>
                      )}

                      <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                        {userRoles.map((role, idx) => (
                          <Chip
                            key={idx}
                            label={String(role)}
                            color="primary"
                            variant="outlined"
                            size="small"
                            sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600 }}
                          />
                        ))}
                        {user?.lecturerCode && (
                          <Chip
                            label={user.lecturerCode}
                            color="success"
                            size="small"
                            sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600 }}
                          />
                        )}
                      </Stack>
                    </Stack>
                  </CardContent>

                  <Divider />

                  <Box sx={{ p: 1.5 }}>
                    <Button
                      fullWidth
                      variant="light"
                      color="error"
                      onClick={handleLogout}
                      startIcon={<Logout size={18} />}
                      sx={{
                        justifyContent: 'flex-start',
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        fontWeight: 600
                      }}
                    >
                      <FormattedMessage id="profile.logout" />
                    </Button>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
