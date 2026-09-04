import { KeyboardEvent } from 'react';

// material-ui
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// assets
import { ArrowRight, DocumentText, SearchNormal1 } from 'iconsax-reactjs';

// third-party
import { FormattedMessage, useIntl } from 'react-intl';

// project-imports
import SimpleBar from 'components/third-party/SimpleBar';
import { SearchableItem } from 'config/searchConfig';

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
            autoFocus
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
              '& .MuiOutlinedInput-input': { fontSize: '1rem', py: 0.5 }
            }}
          />
        </Box>

        {/* Results List */}
        <SimpleBar sx={{ maxHeight: 380, p: 1 }}>
          {results.length > 0 ? (
            <List disablePadding>
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                const IconComponent = item.icon || DocumentText;

                return (
                  <ListItemButton
                    key={`${item.id}-${index}`}
                    selected={isSelected}
                    onClick={() => onSelect(item)}
                    onMouseEnter={() => onSelectedIndexChange(index)}
                    sx={(theme) => ({
                      borderRadius: 1.5,
                      my: 0.5,
                      px: 1.5,
                      py: 1,
                      transition: 'all 0.15s ease-in-out',
                      ...(isSelected && {
                        bgcolor: 'primary.lighter',
                        ...theme.applyStyles('dark', { bgcolor: 'secondary.200' })
                      })
                    })}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: isSelected ? 'primary.main' : 'secondary.main'
                      }}
                    >
                      <IconComponent size={20} variant={isSelected ? 'Bold' : 'Linear'} />
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: isSelected ? 600 : 500,
                              color: isSelected ? 'primary.main' : 'text.primary'
                            }}
                          >
                            {item.title}
                          </Typography>
                          {item.subAppName && (
                            <Chip
                              label={item.subAppName}
                              size="small"
                              variant="outlined"
                              color={isSelected ? 'primary' : 'secondary'}
                              sx={{ height: 18, px: 0.25 }}
                            />
                          )}
                        </Stack>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {item.subTitle || item.category || item.url}
                        </Typography>
                      }
                    />

                    {isSelected && <ArrowRight size={16} style={{ marginLeft: 8, opacity: 0.8 }} color="currentColor" />}
                  </ListItemButton>
                );
              })}
            </List>
          ) : (
            <Box sx={{ py: 5, textAlign: 'center' }}>
              <Typography variant="subtitle1" color="text.secondary">
                <FormattedMessage id="search.no-results" values={{ query }} />
              </Typography>
              <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>
                <FormattedMessage id="search.no-results-hint" />
              </Typography>
            </Box>
          )}
        </SimpleBar>

        {/* Footer shortcuts info */}
        <Divider />
        <Box
          sx={{
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: 'secondary.lighter',
            color: 'text.secondary'
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <Chip label="↑↓" size="small" sx={{ height: 18, px: 0.25 }} />
              <Typography variant="caption">
                <FormattedMessage id="search.navigate" />
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <Chip label="ENTER" size="small" sx={{ height: 18, px: 0.25 }} />
              <Typography variant="caption">
                <FormattedMessage id="search.open" />
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <Typography variant="caption" color="text.disabled">
              Powered by Fuse.js
            </Typography>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
