import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import { SearchNormal1 } from 'iconsax-reactjs';
import { FormattedMessage } from 'react-intl';

interface SearchFooterProps {
  totalResults?: number;
}

const kbdChipSx = {
  height: 20,
  px: 0.5,
  fontWeight: 600,
  bgcolor: 'background.paper',
  color: 'text.secondary',
  boxShadow: 1,
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 1,
  '& .MuiChip-label': {
    px: 0.5
  }
};

export default function SearchFooter({ totalResults }: SearchFooterProps) {
  return (
    <>
      <Divider />
      <Box
        sx={{
          px: 2,
          py: 1.25,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'secondary.lighter',
          color: 'text.secondary'
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <Chip label="↑↓" size="small" sx={kbdChipSx} />
            <Typography variant="caption" color="text.secondary">
              <FormattedMessage id="search.navigate" />
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <Chip label="ENTER" size="small" sx={kbdChipSx} />
            <Typography variant="caption" color="text.secondary">
              <FormattedMessage id="search.open" />
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          {typeof totalResults === 'number' && totalResults > 0 && (
            <Chip
              icon={<SearchNormal1 size={11} />}
              label={totalResults}
              size="small"
              sx={{
                height: 20,
                fontWeight: 600,
                bgcolor: 'secondary.100',
                color: 'text.secondary',
                '& .MuiChip-icon': { ml: 0.75, mr: -0.25, color: 'text.secondary' },
                '& .MuiChip-label': { px: 0.75, fontVariantNumeric: 'tabular-nums' }
              }}
            />
          )}
          <Chip label="ESC" size="small" sx={kbdChipSx} />
        </Stack>
      </Box>
    </>
  );
}
