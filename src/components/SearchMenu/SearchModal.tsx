import { KeyboardEvent } from 'react';

// material-ui
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  InputAdornment,
  List,
  OutlinedInput
} from '@mui/material';

// assets
import { SearchNormal1 } from 'iconsax-react';

// third-party
import { useIntl } from 'react-intl';

import SimpleBar from 'components/third-party/SimpleBar';
import { SearchableItem } from 'config/searchConfig';
import SearchResultItem from './SearchResultItem';
import SearchEmptyState from './SearchEmptyState';
import SearchFooter from './SearchFooter';

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
      <DialogContent sx={{ p: 0 }}>
        {/* Search Input Bar */}
        <Box sx={{ p: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <OutlinedInput
            fullWidth
            inputRef={(input) => input?.focus()}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={intl.formatMessage({ id: 'search.placeholder' })}
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'primary.main', mr: 1 }}>
                <SearchNormal1 size={20} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <Chip
                  label="ESC"
                  size="small"
                  onClick={onClose}
                  sx={{
                    height: 22,
                    fontWeight: 600,
                    cursor: 'pointer',
                    bgcolor: 'secondary.100',
                    color: 'text.secondary'
                  }}
                />
              </InputAdornment>
            }
            sx={{
              bgcolor: 'transparent',
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiOutlinedInput-input': { py: 0.75 }
            }}
          />
        </Box>

        {/* Results List */}
        <SimpleBar sx={{ maxHeight: 400, p: 1 }}>
          {results.length > 0 ? (
            <List disablePadding>
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
        <SearchFooter />
      </DialogContent>
    </Dialog>
  );
}
