import { KeyboardEvent } from 'react';

// material-ui
import { Box, Chip, Dialog, DialogContent, DialogTitle, InputAdornment, List, OutlinedInput } from '@mui/material';

// assets
import { SearchNormal1 } from 'iconsax-reactjs';

// third-party
import { useIntl } from 'react-intl';

import { visuallyHidden } from '@mui/utils';
import SimpleBar from 'components/third-party/SimpleBar';
import { SearchableItem } from 'config/searchConfig';
import SearchEmptyState from './SearchEmptyState';
import SearchFooter from './SearchFooter';
import SearchResultItem from './SearchResultItem';

interface Props {
  open: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (val: string) => void;
  results: SearchableItem[];
  selectedIndex: number;
  onSelectedIndexChange: (idx: number) => void;
  onSelect: (item: SearchableItem) => void;
}

// ==============================|| SEARCH MODAL / COMMAND PALETTE ||============================== //

export default function SearchModal({
  open,
  onClose,
  query,
  onQueryChange,
  results,
  selectedIndex,
  onSelectedIndexChange,
  onSelect
}: Props) {
  const intl = useIntl();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      onSelectedIndexChange(selectedIndex < results.length - 1 ? selectedIndex + 1 : 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onSelectedIndexChange(selectedIndex > 0 ? selectedIndex - 1 : results.length - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        onSelect(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-label={intl.formatMessage({ id: 'search.dialog.title' })}
      slotProps={{
        backdrop: {
          sx: { backdropFilter: 'blur(4px)', bgcolor: 'rgba(0, 0, 0, 0.4)' }
        },
        paper: {
          sx: (theme) => ({
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: theme.vars.customShadows.z1 || 24,
            backgroundImage: 'none',
            border: '1px solid',
            borderColor: 'divider'
          })
        }
      }}
    >
      <DialogTitle sx={visuallyHidden}>{intl.formatMessage({ id: 'search.dialog.title' })}</DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        {/* Visually hidden live region for screen reader search announcements */}
        <Box sx={visuallyHidden} aria-live="polite" aria-atomic="true">
          {query
            ? results.length > 0
              ? intl.formatMessage({ id: 'search.results.count' }, { count: results.length })
              : intl.formatMessage({ id: 'search.no-results' }, { query })
            : ''}
        </Box>

        {/* Search Input Bar */}
        <Box sx={{ p: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <OutlinedInput
            fullWidth
            inputRef={(input) => input?.focus()}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={intl.formatMessage({ id: 'search.placeholder' })}
            inputProps={{
              'aria-label': intl.formatMessage({ id: 'search.placeholder' }),
              role: 'combobox',
              'aria-autocomplete': 'list',
              'aria-expanded': results.length > 0,
              'aria-controls': 'search-results-list',
              'aria-activedescendant': results[selectedIndex] ? `search-item-${results[selectedIndex].id}` : undefined
            }}
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'primary.main', mr: 1 }} aria-hidden="true">
                <SearchNormal1 size={20} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <Chip
                  label="ESC"
                  size="small"
                  aria-label={intl.formatMessage({ id: 'search.close' })}
                  onClick={onClose}
                  sx={{
                    minHeight: 24,
                    height: 24,
                    fontWeight: 600,
                    cursor: 'pointer',
                    bgcolor: 'secondary.100',
                    color: 'text.secondary',
                    '&:focus-visible': {
                      outline: '2px solid',
                      outlineColor: 'primary.main'
                    }
                  }}
                />
              </InputAdornment>
            }
            sx={{
              bgcolor: 'transparent',
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiOutlinedInput-input': {
                py: 0.75,
                '&:focus': { outline: 'none' }
              }
            }}
          />
        </Box>

        {/* Results List */}
        <SimpleBar sx={{ maxHeight: 420, px: 1, py: 0.75 }}>
          {results.length > 0 ? (
            <List
              component="div"
              role="listbox"
              id="search-results-list"
              aria-label={intl.formatMessage({ id: 'search.results' })}
              disablePadding
            >
              {results.map((item, index) => (
                <SearchResultItem
                  key={`${item.subAppId || ''}-${item.id}`}
                  item={item}
                  isSelected={index === selectedIndex}
                  onSelect={onSelect}
                  onMouseEnter={() => onSelectedIndexChange(index)}
                />
              ))}
            </List>
          ) : (
            <SearchEmptyState query={query} />
          )}
        </SimpleBar>

        {/* Footer shortcuts info */}
        <SearchFooter totalResults={results.length} />
      </DialogContent>
    </Dialog>
  );
}
