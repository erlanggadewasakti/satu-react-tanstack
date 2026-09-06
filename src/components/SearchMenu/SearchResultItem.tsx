import { Chip, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { SearchableItem, resolveLocalizedText } from 'config/searchConfig';
import { ArrowRight, DocumentText } from 'iconsax-reactjs';
import { useEffect, useRef } from 'react';
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

export default function SearchResultItem({ item, isSelected, onSelect, onMouseEnter }: SearchResultItemProps) {
  const intl = useIntl();
  const itemRef = useRef<HTMLDivElement | null>(null);

  const title = resolveLocalizedText(item.title);
  const subTitle = resolveLocalizedText(item.subTitle);
  const description = resolveLocalizedText(item.description);
  const subAppName = resolveLocalizedText(item.subAppName);
  const category = resolveLocalizedText(item.category);

  const isEn = intl.locale === 'en';
  const displayTitle = isEn ? title.en || title.id : title.id || title.en;
  const displaySubTitle = isEn ? subTitle.en || subTitle.id : subTitle.id || subTitle.en;
  const displayDescription = isEn ? description.en || description.id : description.id || description.en;
  const badgeText = getBadgeText(subAppName, category, intl.locale);

  const hasSubTitle = Boolean(
    displaySubTitle &&
    displaySubTitle !== displayTitle &&
    displaySubTitle !== (isEn ? subAppName.en : subAppName.id) &&
    displaySubTitle !== (isEn ? category.en : category.id)
  );
  const hasDescription = Boolean(displayDescription && displayDescription !== displayTitle);
  const secondaryText = hasSubTitle ? displaySubTitle : hasDescription ? displayDescription : item.url;

  const IconComponent = item.icon || DocumentText;

  // Auto-scroll selected item into view smoothly
  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [isSelected]);

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
