import { Chip, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { SearchableItem, resolveLocalizedText } from 'config/searchConfig';
import { ArrowRight, DocumentText } from 'iconsax-reactjs';
import { RefObject, useEffect, useRef } from 'react';
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

function getLocalizedValue(text: { id: string; en?: string }, isEn: boolean): string {
  return (isEn ? text.en || text.id : text.id || text.en) || '';
}

function getSearchResultTexts(item: SearchableItem, locale: string) {
  const isEn = locale === 'en';
  const title = resolveLocalizedText(item.title);
  const subTitle = resolveLocalizedText(item.subTitle);
  const description = resolveLocalizedText(item.description);
  const subAppName = resolveLocalizedText(item.subAppName);
  const category = resolveLocalizedText(item.category);

  const displayTitle = getLocalizedValue(title, isEn);
  const displaySubTitle = getLocalizedValue(subTitle, isEn);
  const displayDescription = getLocalizedValue(description, isEn);
  const badgeText = getBadgeText(subAppName, category, locale);

  const subAppMatch = isEn ? subAppName.en : subAppName.id;
  const categoryMatch = isEn ? category.en : category.id;

  const hasSubTitle = Boolean(
    displaySubTitle &&
    displaySubTitle !== displayTitle &&
    displaySubTitle !== subAppMatch &&
    displaySubTitle !== categoryMatch
  );
  const hasDescription = Boolean(displayDescription && displayDescription !== displayTitle);
  const secondaryText = hasSubTitle ? displaySubTitle : hasDescription ? displayDescription : item.url;

  return { displayTitle, secondaryText, badgeText };
}

function useAutoScrollIntoView(ref: RefObject<HTMLDivElement | null>, isSelected: boolean) {
  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.scrollIntoView({ block: 'nearest' });
    }
  }, [isSelected, ref]);
}

function SearchResultIcon({ item, isSelected }: { item: SearchableItem; isSelected: boolean }) {
  const IconComponent = item.icon || DocumentText;

  return (
    <ListItemIcon
      sx={{
        minWidth: 36,
        width: 36,
        height: 36,
        borderRadius: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: isSelected ? 'background.paper' : 'secondary.100',
        color: isSelected ? 'primary.main' : 'text.secondary',
        mr: 1.5,
        boxShadow: isSelected ? 1 : 0,
        transition: 'none',
        flexShrink: 0
      }}
    >
      <IconComponent size={18} variant={isSelected ? 'Bold' : 'Linear'} />
    </ListItemIcon>
  );
}

function SearchResultBadge({ text, isSelected }: { text: string; isSelected: boolean }) {
  if (!text) return null;

  return (
    <Chip
      label={text}
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
  );
}

export default function SearchResultItem({ item, isSelected, onSelect, onMouseEnter }: SearchResultItemProps) {
  const intl = useIntl();
  const itemRef = useRef<HTMLDivElement | null>(null);
  useAutoScrollIntoView(itemRef, isSelected);

  const { displayTitle, secondaryText, badgeText } = getSearchResultTexts(item, intl.locale);

  return (
    <ListItemButton
      ref={itemRef}
      selected={isSelected}
      onClick={() => onSelect(item)}
      onMouseEnter={onMouseEnter}
      sx={(theme) => ({
        borderRadius: 2,
        my: 0.35,
        px: 1.5,
        py: 0.85,
        alignItems: 'center',
        minHeight: 52,
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
      <SearchResultIcon item={item} isSelected={isSelected} />

      <ListItemText
        disableTypography
        sx={{ my: 0, flex: 1, minWidth: 0 }}
        primary={
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography
              variant="subtitle1"
              noWrap
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.35
              }}
            >
              {displayTitle}
            </Typography>

            <SearchResultBadge text={badgeText} isSelected={isSelected} />
          </Stack>
        }
        secondary={
          Boolean(secondaryText) && (
            <Typography
              variant="caption"
              noWrap
              sx={{
                color: 'text.secondary',
                fontWeight: 400,
                lineHeight: 1.3,
                mt: 0.25,
                display: 'block'
              }}
            >
              {secondaryText}
            </Typography>
          )
        }
      />

      {isSelected && (
        <ArrowRight size={16} style={{ alignSelf: 'center', marginLeft: 10, opacity: 0.8, flexShrink: 0 }} color="currentColor" />
      )}
    </ListItemButton>
  );
}
