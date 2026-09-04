import { MouseEvent, useState } from 'react';

// material-ui
import { Box, ButtonBase, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material';

// assets
import {
  ArrowDown2,
  Award,
  Book,
  Briefcase,
  Calendar,
  DocumentText,
  Element3,
  Profile,
  SecurityUser,
  TickCircle,
  UserSquare
} from 'iconsax-reactjs';

// third-party
import { FormattedMessage, useIntl } from 'react-intl';

// project-imports
import useSubApp from 'hooks/useSubApp';

interface Props {
  collapsed?: boolean;
}

// Icon helper for sub-apps
const getSubAppIcon = (id: string) => {
  switch (id) {
    case 'super-admin':
      return SecurityUser;
    case 'akademik-admin':
      return UserSquare;
    case 'kurikulum':
      return Book;
    case 'silabus':
      return DocumentText;
    case 'perkuliahan':
      return Calendar;
    case 'penilaian':
      return Award;
    case 'portofolio':
      return Briefcase;
    case 'example':
      return Element3;
    default:
      return Profile;
  }
};

// ==============================|| SUB-APP SELECTOR ("MODUL APP") ||============================== //

export default function SubAppSelector({ collapsed }: Props) {
  const intl = useIntl();
  const { activeSubApp, subApps, changeSubApp } = useSubApp();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (appId: string) => {
    changeSubApp(appId);
    handleClose();
  };

  const getLocalizedAppName = (app?: { id: string; name: string }) => {
    if (!app) return '';
    return intl.formatMessage({ id: `subapp.${app.id}.name` as any });
  };

  const getLocalizedAppDesc = (app?: { id: string; description?: string }) => {
    if (!app?.description) return '';
    return intl.formatMessage({ id: `subapp.${app.id}.desc` as any });
  };

  const appName = getLocalizedAppName(activeSubApp);
  const ActiveIcon = getSubAppIcon(activeSubApp?.id || '');

  // Collapsed Mode (Mini Drawer)
  if (collapsed) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
        <Tooltip title={`${intl.formatMessage({ id: 'menu.modul-app' })}: ${appName}`} placement="right">
          <IconButton
            onClick={handleClick}
            color="primary"
            size="medium"
            sx={(theme) => ({
              width: 44,
              height: 44,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'primary.lighter',
                borderColor: 'primary.main',
                ...theme.applyStyles('dark', { bgcolor: 'secondary.100' })
              }
            })}
          >
            <ActiveIcon size={20} variant="Bold" />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          slotProps={{
            paper: {
              sx: (theme) => ({
                minWidth: 260,
                borderRadius: 2,
                boxShadow: theme.vars.customShadows.z1 || 8,
                border: '1px solid',
                borderColor: 'divider',
                p: 1
              })
            }
          }}
        >
          <Box sx={{ px: 1.5, py: 0.75, mb: 0.5 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'text.secondary',
                display: 'block'
              }}
            >
              <FormattedMessage id="menu.modul-app" />
            </Typography>
          </Box>
          {subApps.map((app) => {
            const isSelected = app.id === activeSubApp?.id;
            const ItemIcon = getSubAppIcon(app.id);
            const localizedName = getLocalizedAppName(app);
            const localizedDesc = getLocalizedAppDesc(app);

            return (
              <Tooltip
                key={app.id}
                title={
                  localizedDesc ? (
                    <Box sx={{ p: 0.5, maxWidth: 240 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'inherit', mb: 0.25 }}>
                        {localizedName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'inherit', opacity: 0.9, lineHeight: 1.4, display: 'block' }}>
                        {localizedDesc}
                      </Typography>
                    </Box>
                  ) : (
                    localizedName
                  )
                }
                placement="right"
                arrow
                enterDelay={150}
                enterNextDelay={100}
              >
                <MenuItem
                  selected={isSelected}
                  onClick={() => handleSelect(app.id)}
                  sx={(theme) => ({
                    borderRadius: 1.5,
                    my: 0.25,
                    py: 1,
                    px: 1.5,
                    transition: 'all 0.15s ease-in-out',
                    ...(isSelected && {
                      bgcolor: 'primary.lighter',
                      ...theme.applyStyles('dark', { bgcolor: 'secondary.200' })
                    })
                  })}
                >
                  <ListItemIcon sx={{ minWidth: 34, color: isSelected ? 'primary.main' : 'secondary.main' }}>
                    <ItemIcon size={18} variant={isSelected ? 'Bold' : 'Linear'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" sx={{ fontWeight: isSelected ? 600 : 500 }}>
                        {localizedName}
                      </Typography>
                    }
                  />
                  {isSelected && <TickCircle size={16} color="currentColor" style={{ marginLeft: 8 }} />}
                </MenuItem>
              </Tooltip>
            );
          })}
        </Menu>
      </Box>
    );
  }

  // Expanded Mode (Sidebar Drawer Open)
  return (
    <Box sx={{ px: 2, py: 1 }}>
      {/* Label: MODUL APP */}
      <Typography
        variant="overline"
        sx={{
          color: 'text.secondary',
          display: 'block',
          mb: 0.75,
          px: 0.25
        }}
      >
        <FormattedMessage id="menu.modul-app" />
      </Typography>

      {/* Styled Selector Button */}
      <ButtonBase
        onClick={handleClick}
        aria-controls={open ? 'sub-app-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={(theme) => ({
          width: '100%',
          height: 42,
          px: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 2,
          border: '1px solid',
          borderColor: open ? 'primary.main' : 'divider',
          bgcolor: 'background.paper',
          transition: 'all 0.2s ease-in-out',
          textAlign: 'left',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'secondary.lighter',
            ...theme.applyStyles('dark', {
              bgcolor: 'secondary.100',
              borderColor: 'primary.main'
            })
          }
        })}
      >
        {/* Left Icon and Sub-App Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, overflow: 'hidden' }}>
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.main',
              ...theme.applyStyles('dark', { color: 'primary.light' })
            })}
          >
            <ActiveIcon size={18} variant="Bold" />
          </Box>

          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.primary',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {appName}
          </Typography>
        </Box>

        {/* Right Arrow Chevron */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
            transition: 'transform 0.2s ease-in-out',
            transform: open ? 'rotate(180deg)' : 'none'
          }}
        >
          <ArrowDown2 size={16} />
        </Box>
      </ButtonBase>

      {/* Popover Menu for Sub-Apps */}
      <Menu
        id="sub-app-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: (theme) => ({
              width: 268,
              maxWidth: '100%',
              mt: 0.5,
              borderRadius: 2,
              boxShadow: theme.vars.customShadows.z1 || 8,
              border: '1px solid',
              borderColor: 'divider',
              p: 1
            })
          }
        }}
      >
        {subApps.map((app) => {
          const isSelected = app.id === activeSubApp?.id;
          const ItemIcon = getSubAppIcon(app.id);
          const localizedName = getLocalizedAppName(app);
          const localizedDesc = getLocalizedAppDesc(app);

          return (
            <Tooltip
              key={app.id}
              title={
                localizedDesc ? (
                  <Box sx={{ p: 0.5, maxWidth: 240 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'inherit', mb: 0.25 }}>
                      {localizedName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'inherit', opacity: 0.9, lineHeight: 1.4, display: 'block' }}>
                      {localizedDesc}
                    </Typography>
                  </Box>
                ) : (
                  localizedName
                )
              }
              placement="right"
              arrow
              enterDelay={150}
              enterNextDelay={100}
            >
              <MenuItem
                selected={isSelected}
                onClick={() => handleSelect(app.id)}
                sx={(theme) => ({
                  borderRadius: 1.5,
                  my: 0.25,
                  py: 1,
                  px: 1.5,
                  transition: 'all 0.15s ease-in-out',
                  ...(isSelected && {
                    bgcolor: 'primary.lighter',
                    ...theme.applyStyles('dark', { bgcolor: 'secondary.200' })
                  }),
                  '&:hover': {
                    bgcolor: isSelected ? 'primary.lighter' : 'secondary.lighter',
                    ...theme.applyStyles('dark', {
                      bgcolor: isSelected ? 'secondary.200' : 'secondary.100'
                    })
                  }
                })}
              >
                <ListItemIcon sx={{ minWidth: 34, color: isSelected ? 'primary.main' : 'secondary.main' }}>
                  <ItemIcon size={18} variant={isSelected ? 'Bold' : 'Linear'} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" sx={{ fontWeight: isSelected ? 600 : 500 }}>
                      {localizedName}
                    </Typography>
                  }
                />
                {isSelected && <TickCircle size={16} color="currentColor" style={{ marginLeft: 8 }} />}
              </MenuItem>
            </Tooltip>
          );
        })}
      </Menu>
    </Box>
  );
}
