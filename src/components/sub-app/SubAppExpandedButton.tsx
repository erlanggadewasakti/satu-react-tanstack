import { MouseEvent } from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { ArrowDown2 } from 'iconsax-react';
import { FormattedMessage } from 'react-intl';
import SubAppIcon from './SubAppIcon';

interface SubAppExpandedButtonProps {
  appName: string;
  appId?: string;
  open: boolean;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

export default function SubAppExpandedButton({ appName, appId, open, onClick }: SubAppExpandedButtonProps) {
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
        onClick={onClick}
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
            <SubAppIcon id={appId} size={18} variant="Bold" />
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
    </Box>
  );
}
