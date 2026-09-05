import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

export default function SearchFooter() {
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
            <Chip
              label="↑↓"
              size="small"
              sx={{
                height: 20,
                px: 0.25,
                fontWeight: 600,
                bgcolor: 'background.paper',
                color: 'text.secondary',
                boxShadow: 1
              }}
            />
            <Typography variant="caption" color="text.secondary">
              <FormattedMessage id="search.navigate" />
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <Chip
              label="ENTER"
              size="small"
              sx={{
                height: 20,
                px: 0.25,
                fontWeight: 600,
                bgcolor: 'background.paper',
                color: 'text.secondary',
                boxShadow: 1
              }}
            />
            <Typography variant="caption" color="text.secondary">
              <FormattedMessage id="search.open" />
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="caption" color="text.disabled">
          Powered by Fuse.js
        </Typography>
      </Box>
    </>
  );
}
