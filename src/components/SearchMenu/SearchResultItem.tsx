import { Box, Chip, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { SearchableItem, resolveLocalizedText } from 'config/searchConfig';
import { ArrowRight, DocumentText } from 'iconsax-reactjs';
import { useIntl } from 'react-intl';

interface SearchResultItemProps {
  item: SearchableItem;
  isSelected: boolean;
  onSelect: (item: SearchableItem) => void;
  onMouseEnter: () => void;
}

function getBadgeText(subAppName: { id: string; en?: string }, category: { id: string; en?: string }, locale: string): string {
  if (subAppName.id) {
    return locale === 'en' ? subAppName.en || subAppName.id : subAppName.id || subAppName.en || '';
  }

  const ignoredCategories = ['GENERAL', 'MENU', 'SUPPORT', 'OTHERS'];
  if (category.id && !ignoredCategories.includes(category.id.toUpperCase())) {
    return locale === 'en' ? category.en || category.id : category.id || category.en || '';
  }

  return '';
}

function SearchResultTitle({
  title,
  badgeText,
  isSelected
}: {
  title: { id: string; en?: string };
  badgeText: string;
  isSelected: boolean;
}) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 0.75, minWidth: 0 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.4 }}>
          {title.id}
        </Typography>
        {title.en && title.en !== title.id && (
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.4 }}>
            ({title.en})
          </Typography>
        )}
      </Box>

      {Boolean(badgeText) && (
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
  );
}

function SearchResultSubtitle({ subTitle, isSelected }: { subTitle: { id: string; en?: string }; isSelected: boolean }) {
  if (!subTitle.id && !subTitle.en) return null;

  return (
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
        <Box component="span" sx={{ color: isSelected ? 'text.primary' : 'text.secondary', fontWeight: 500, fontStyle: 'italic' }}>
          • {subTitle.en}
        </Box>
      )}
    </Typography>
  );
}

function SearchResultDescription({ description, isSelected }: { description: { id: string; en?: string }; isSelected: boolean }) {
  return (
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
              color: 'text.primary',
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
              color: 'text.primary',
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
  );
}

function SearchResultSecondary({
  hasSubTitle,
  subTitle,
  hasDescription,
  description,
  url,
  isSelected
}: {
  hasSubTitle: boolean;
  subTitle: { id: string; en?: string };
  hasDescription: boolean;
  description: { id: string; en?: string };
  url?: string;
  isSelected: boolean;
}) {
  return (
    <Stack spacing={0.35} sx={{ mt: 0.5, width: '100%' }}>
      {hasSubTitle && <SearchResultSubtitle subTitle={subTitle} isSelected={isSelected} />}
      {hasDescription && <SearchResultDescription description={description} isSelected={isSelected} />}
      {!hasSubTitle && !hasDescription && (
        <Typography variant="caption" sx={{ color: 'text.disabled', fontFamily: 'monospace' }}>
          {url}
        </Typography>
      )}
    </Stack>
  );
}

function SearchResultIcon({ IconComponent, isSelected }: { IconComponent: any; isSelected: boolean }) {
  return (
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
  );
}

export default function SearchResultItem({ item, isSelected, onSelect, onMouseEnter }: SearchResultItemProps) {
  const intl = useIntl();
  const IconComponent = item.icon || DocumentText;

  const title = resolveLocalizedText(item.title);
  const subTitle = resolveLocalizedText(item.subTitle);
  const description = resolveLocalizedText(item.description);
  const subAppName = resolveLocalizedText(item.subAppName);
  const category = resolveLocalizedText(item.category);

  const badgeText = getBadgeText(subAppName, category, intl.locale);
  const hasSubTitle = Boolean(
    (subTitle.id || subTitle.en) && subTitle.id !== title.id && subTitle.id !== subAppName.id && subTitle.id !== category.id
  );
  const hasDescription = Boolean(description.id || description.en);

  return (
    <ListItemButton
      selected={isSelected}
      onClick={() => onSelect(item)}
      onMouseEnter={onMouseEnter}
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
      <SearchResultIcon IconComponent={IconComponent} isSelected={isSelected} />

      <ListItemText
        disableTypography
        sx={{ my: 0, flex: 1, minWidth: 0 }}
        primary={<SearchResultTitle title={title} badgeText={badgeText} isSelected={isSelected} />}
        secondary={
          <SearchResultSecondary
            hasSubTitle={hasSubTitle}
            subTitle={subTitle}
            hasDescription={hasDescription}
            description={description}
            url={item.url}
            isSelected={isSelected}
          />
        }
      />

      {isSelected && (
        <ArrowRight size={18} style={{ alignSelf: 'center', marginLeft: 12, opacity: 0.8, flexShrink: 0 }} color="currentColor" />
      )}
    </ListItemButton>
  );
}
