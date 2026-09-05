import { Box, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { TickCircle } from 'iconsax-reactjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { SubAppConfig } from 'types/subApp';
import SubAppIcon from './SubAppIcon';

interface SubAppMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  subApps: SubAppConfig[];
  activeSubApp?: SubAppConfig;
  onSelect: (appId: string) => void;
  isMini?: boolean;
}

export default function SubAppMenu({ anchorEl, open, onClose, subApps, activeSubApp, onSelect, isMini = false }: SubAppMenuProps) {
  const intl = useIntl();

  const getLocalizedAppName = (app?: { id: string; name: string }) => {
    if (!app) return '';
    return intl.formatMessage({ id: `subapp.${app.id}.name` as any });
  };

  const getLocalizedAppDesc = (app?: { id: string; description?: string }) => {
    if (!app?.description) return '';
    return intl.formatMessage({ id: `subapp.${app.id}.desc` as any });
  };

  return (
    <Menu
      id="sub-app-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={isMini ? { vertical: 'bottom', horizontal: 'right' } : { vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{
        paper: {
          sx: (theme) => ({
            minWidth: 260,
            width: isMini ? 260 : 268,
            maxWidth: '100%',
            mt: isMini ? 0 : 0.5,
            borderRadius: 2,
            boxShadow: theme.vars.customShadows.z1 || 8,
            border: '1px solid',
            borderColor: 'divider',
            p: 1
          })
        }
      }}
    >
      {isMini && (
        <Box sx={{ px: 1.5, py: 0.75, mb: 0.5 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
            <FormattedMessage id="menu.modul-app" />
          </Typography>
        </Box>
      )}
      {subApps.map((app) => {
        const isSelected = app.id === activeSubApp?.id;
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
              onClick={() => onSelect(app.id)}
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
                <SubAppIcon id={app.id} size={18} variant={isSelected ? 'Bold' : 'Linear'} />
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
  );
}
