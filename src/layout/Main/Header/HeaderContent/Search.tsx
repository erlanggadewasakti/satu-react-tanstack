// material-ui
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

// assets
import { SearchNormal1 } from 'iconsax-react';

// project-imports
import useMenuSearch from 'hooks/useMenuSearch';

// ==============================|| HEADER CONTENT - SEARCH (FUSE.JS) ||============================== //

export default function Search() {
  const { openSearch } = useMenuSearch();

  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const shortcutText = isMac ? '⌘ + K' : 'Ctrl + K';

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 2 } }}>
      <ButtonBase
        onClick={openSearch}
        sx={(theme) => ({
          width: { xs: '100%', md: 240 },
          height: 40,
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
          <SearchNormal1 size={16} />
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
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
