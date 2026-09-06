import { Box, Typography } from '@mui/material';
import { SearchNormal1 } from 'iconsax-reactjs';
import { FormattedMessage } from 'react-intl';

interface SearchEmptyStateProps {
  query: string;
}

export default function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <Box sx={{ py: 6, px: 3, textAlign: 'center' }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: 'secondary.100',
          color: 'text.secondary',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 1.5
        }}
      >
        <SearchNormal1 size={24} />
      </Box>
      <Typography variant="subtitle1" color="text.secondary">
        <FormattedMessage id="search.no-results" values={{ query }} />
      </Typography>
      <Typography variant="body2" color="text.disabled" sx={{ mt: 0.75, display: 'block' }}>
        <FormattedMessage id="search.no-results-hint" />
      </Typography>
    </Box>
  );
}
