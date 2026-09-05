import { Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

interface SearchEmptyStateProps {
  query: string;
}

export default function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <Box sx={{ py: 6, px: 2, textAlign: 'center' }}>
      <Typography variant="subtitle1" color="text.secondary">
        <FormattedMessage id="search.no-results" values={{ query }} />
      </Typography>
      <Typography variant="body2" color="text.disabled" sx={{ mt: 0.75, display: 'block' }}>
        <FormattedMessage id="search.no-results-hint" />
      </Typography>
    </Box>
  );
}
