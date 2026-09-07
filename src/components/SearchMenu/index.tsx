import { Box, ButtonBase, IconButton, Tooltip, Typography } from '@mui/material';

// assets
import { SearchNormal1 } from 'iconsax-reactjs';

// project-imports
import useMenuSearch from 'hooks/useMenuSearch';

interface Props {
  collapsed?: boolean;
}

// ==============================|| SIDEBAR SEARCH MENU COMPONENT ||============================== //

export default function SearchMenu({ collapsed }: Props) {
  const { openSearch } = useMenuSearch();

  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const shortcutText = isMac ? '⌘ + K' : 'Ctrl + K';

  if (collapsed) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
        <Tooltip title={`Search (${shortcutText})`} placement="right">
          <IconButton
            onClick={openSearch}
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
            <SearchNormal1 size={20} />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, py: 1 }}>
      <ButtonBase
        onClick={openSearch}
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
          <SearchNormal1 size={16} />
          <Typography variant="body1" color="text.secondary">
            Search
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
