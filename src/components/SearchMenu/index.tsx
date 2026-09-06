import { Box, ButtonBase, IconButton, Tooltip, Typography } from '@mui/material';

// assets
import { SearchNormal1 } from 'iconsax-reactjs';
import { FormattedMessage, useIntl } from 'react-intl';

// project-imports
import useMenuSearch from 'hooks/useMenuSearch';

interface Props {
  collapsed?: boolean;
}

// ==============================|| SIDEBAR SEARCH MENU COMPONENT ||============================== //

export default function SearchMenu({ collapsed }: Props) {
  const intl = useIntl();
  const { openSearch } = useMenuSearch();

  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const shortcutText = isMac ? '⌘ + K' : 'Ctrl + K';
  const searchLabel = `${intl.formatMessage({ id: 'header.search' })} (${shortcutText})`;

  if (collapsed) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
        <Tooltip title={searchLabel} placement="right">
          <IconButton
            onClick={openSearch}
            aria-label={searchLabel}
            color="secondary"
            size="medium"
            sx={(theme) => ({
              width: 44,
              height: 44,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'secondary.200',
                borderColor: 'secondary.400',
                ...theme.applyStyles('dark', { bgcolor: 'secondary.100' })
              }
            })}
          >
            <SearchNormal1 size={20} aria-hidden="true" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, py: 1 }}>
      <ButtonBase
        onClick={openSearch}
        aria-label={searchLabel}
        sx={(theme) => ({
          width: '100%',
          height: 42,
          px: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
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
        {/* Left search icon & placeholder */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, color: 'text.secondary' }}>
          <SearchNormal1 size={16} aria-hidden="true" />
          <Typography variant="body1" color="text.secondary">
            <FormattedMessage id="header.search" />
          </Typography>
        </Box>

        {/* Right shortcut badge */}
        <Box
          sx={(theme) => ({
            px: 0.75,
            py: 0.25,
            borderRadius: 1,
            bgcolor: 'secondary.100',
            border: '1px solid',
            borderColor: 'secondary.200',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'text.secondary',
            letterSpacing: '0.5px',
            ...theme.applyStyles('dark', {
              bgcolor: 'secondary.200',
              borderColor: 'divider'
            })
          })}
        >
          {shortcutText}
        </Box>
      </ButtonBase>
    </Box>
  );
}
