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

import SimpleBar from 'components/third-party/SimpleBar';
import { SearchableItem, resolveLocalizedText } from 'config/searchConfig';

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
              '& .MuiOutlinedInput-input': { py: 0.75 }
            }}
          />
        </Box>

        {/* Results List */}
        <SimpleBar sx={{ maxHeight: 400, p: 1 }}>
          {results.length > 0 ? (
            <List disablePadding>
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                const IconComponent = item.icon || DocumentText;

                const title = resolveLocalizedText(item.title);
                const subTitle = resolveLocalizedText(item.subTitle);
                const description = resolveLocalizedText(item.description);
                const subAppName = resolveLocalizedText(item.subAppName);
                const category = resolveLocalizedText(item.category);

                // Determine badge text: prefer subAppName, fallback to category if meaningful and distinct
                const badgeText = subAppName.id
                  ? intl.locale === 'en'
                    ? subAppName.en || subAppName.id
                    : subAppName.id || subAppName.en
                  : category.id && !['GENERAL', 'MENU', 'SUPPORT', 'OTHERS'].includes(category.id.toUpperCase())
                    ? intl.locale === 'en'
                      ? category.en || category.id
                      : category.id || category.en
                    : '';

                // Subtitle should not duplicate title, subAppName, or category
                const hasSubTitle = Boolean(
                  (subTitle.id || subTitle.en) && subTitle.id !== title.id && subTitle.id !== subAppName.id && subTitle.id !== category.id
                );
                const hasDescription = Boolean(description.id || description.en);

                return (
                  <ListItemButton
                    key={`${item.subAppId || ''}-${item.id}`}
                    selected={isSelected}
                    onClick={() => onSelect(item)}
                    onMouseEnter={() => onSelectedIndexChange(index)}
                    sx={(theme) => ({
                      borderRadius: 2,
                      my: 0.5,
                      px: 1.5,
                      py: 1.25,
                      alignItems: 'flex-start',
                      transition: 'none',
                      '&:hover': {
                        transition: 'none',
                        bgcolor: 'secondary.100'
                      },
                      '&.Mui-selected': {
                        transition: 'none'
                      },
                      ...(isSelected && {
                        bgcolor: 'primary.lighter',
                        ...theme.applyStyles('dark', { bgcolor: 'secondary.200' })
                      })
                    })}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        width: 40,
                        height: 40,
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: isSelected ? 'background.paper' : 'secondary.100',
                        color: isSelected ? 'primary.main' : 'text.secondary',
                        mr: 1.75,
                        mt: 0.25,
                        boxShadow: isSelected ? 1 : 0,
                        transition: 'none'
                      }}
                    >
                      <IconComponent size={20} variant={isSelected ? 'Bold' : 'Linear'} />
                    </ListItemIcon>

                    <ListItemText
                      disableTypography
                      sx={{ my: 0, flex: 1, minWidth: 0 }}
                      primary={
                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 0.75, minWidth: 0 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
                                color: 'text.primary',
                                lineHeight: 1.4
                              }}
                            >
                              {title.id}
                            </Typography>
                            {title.en && title.en !== title.id && (
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'text.secondary',
                                  fontWeight: 500,
                                  fontStyle: 'italic',
                                  lineHeight: 1.4
                                }}
                              >
                                ({title.en})
                              </Typography>
                            )}
                          </Box>

                          {badgeText && (
                            <Chip
                              label={badgeText}
                              size="small"
                              variant={isSelected ? 'filled' : 'outlined'}
                              sx={{
                                height: 20,
                                flexShrink: 0,
                                ml: 1,
                                borderRadius: 1,
                                transition: 'none',
                                borderColor: isSelected ? 'transparent' : 'divider',
                                bgcolor: isSelected ? 'primary.main' : 'secondary.100',
                                color: isSelected ? 'common.white' : 'text.secondary',
                                '& .MuiChip-label': {
                                  px: 0.75,
                                  py: 0,
                                  fontWeight: isSelected ? 600 : 500
                                }
                              }}
                            />
                          )}
                        </Stack>
                      }
                      secondary={
                        <Stack spacing={0.35} sx={{ mt: 0.5, width: '100%' }}>
                          {hasSubTitle && (
                            <Typography
                              variant="caption"
                              sx={{
                                color: isSelected ? 'text.primary' : 'text.secondary',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                lineHeight: 1.35
                              }}
                            >
                              <Box component="span" sx={{ fontWeight: 700 }}>
                                {subTitle.id}
                              </Box>
                              {subTitle.en && subTitle.en !== subTitle.id && (
                                <Box
                                  component="span"
                                  sx={{
                                    color: isSelected ? 'text.primary' : 'text.secondary',
                                    fontWeight: 500,
                                    fontStyle: 'italic'
                                  }}
                                >
                                  • {subTitle.en}
                                </Box>
                              )}
                            </Typography>
                          )}

                          {hasDescription && (
                            <Stack spacing={0.35} sx={{ mt: 0.5 }}>
                              {description.id && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                  <Chip
                                    label="ID"
                                    size="small"
                                    sx={(theme) => ({
                                      height: 18,
                                      borderRadius: 0.5,
                                      transition: 'none',
                                      bgcolor: isSelected ? '#ffffff' : '#ffebee',
                                      color: '#d32f2f',
                                      border: '1px solid',
                                      borderColor: '#ffcdd2',
                                      ...theme.applyStyles('dark', {
                                        bgcolor: isSelected ? 'background.paper' : 'rgba(211, 47, 47, 0.15)',
                                        color: '#ef5350',
                                        borderColor: 'rgba(211, 47, 47, 0.4)'
                                      }),
                                      '& .MuiChip-label': { px: 0.6, fontWeight: 700 }
                                    })}
                                  />
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color: isSelected ? 'text.primary' : 'text.primary',
                                      lineHeight: 1.45,
                                      display: '-webkit-box',
                                      WebkitLineClamp: 1,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                      fontWeight: 700
                                    }}
                                  >
                                    {description.id}
                                  </Typography>
                                </Box>
                              )}
                              {description.en && description.en !== description.id && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                  <Chip
                                    label="EN"
                                    size="small"
                                    sx={(theme) => ({
                                      height: 18,
                                      borderRadius: 0.5,
                                      transition: 'none',
                                      bgcolor: isSelected ? '#ffffff' : '#e3f2fd',
                                      color: '#1976d2',
                                      border: '1px solid',
                                      borderColor: '#bbdefb',
                                      ...theme.applyStyles('dark', {
                                        bgcolor: isSelected ? 'background.paper' : 'rgba(25, 118, 210, 0.15)',
                                        color: '#42a5f5',
                                        borderColor: 'rgba(25, 118, 210, 0.4)'
                                      }),
                                      '& .MuiChip-label': { px: 0.6, fontWeight: 700 }
                                    })}
                                  />
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color: isSelected ? 'text.primary' : 'text.primary',
                                      lineHeight: 1.45,
                                      display: '-webkit-box',
                                      WebkitLineClamp: 1,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                      fontWeight: 500,
                                      fontStyle: 'italic'
                                    }}
                                  >
                                    {description.en}
                                  </Typography>
                                </Box>
                              )}
                            </Stack>
                          )}

                          {!hasSubTitle && !hasDescription && (
                            <Typography variant="caption" sx={{ color: 'text.disabled', fontFamily: 'monospace' }}>
                              {item.url}
                            </Typography>
                          )}
                        </Stack>
                      }
                    />

                    {isSelected && (
                      <ArrowRight
                        size={18}
                        style={{
                          alignSelf: 'center',
                          marginLeft: 12,
                          opacity: 0.8,
                          flexShrink: 0
                        }}
                        color="currentColor"
                      />
                    )}
                  </ListItemButton>
                );
              })}
            </List>
          ) : (
            <Box sx={{ py: 6, px: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1" color="text.secondary">
                <FormattedMessage id="search.no-results" values={{ query }} />
              </Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mt: 0.75, display: 'block' }}>
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
      </DialogContent>
    </Dialog>
  );
}
