import { Link } from '@tanstack/react-router';
import { ReactNode } from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useIntl } from 'react-intl';

// project-imports
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import SafeFormattedMessage from 'components/@extended/SafeFormattedMessage';
import { NavActionType } from 'config';

// types
import { LinkTarget, NavItemType } from 'types/menu';
import { OverrideIcon } from 'types/root';

interface NavItemVerticalProps {
  item: NavItemType;
  level: number;
  isSelected: boolean;
  drawerOpen: boolean;
  itemTarget: LinkTarget;
  itemIcon: ReactNode;
  iconSelectedColor: string;
  onItemClick: () => void;
}

function getPaddingLeft(level: number, drawerOpen: boolean): number {
  if (level === 2) return 3.25;
  if (!drawerOpen) return 1.5;
  return level <= 3 ? (level * 20) / 8 : (level * 20 + (level - 3) * 10) / 8;
}

function resolveItemTitle(title: unknown, messages: Record<string, string>, intl: ReturnType<typeof useIntl>): string {
  if (typeof title !== 'string' || !title.trim()) return '';
  return messages[title] ? intl.formatMessage({ id: title as any }) : title;
}

interface NavItemIconProps {
  itemIcon: ReactNode;
  drawerOpen: boolean;
  isSelected: boolean;
  iconSelectedColor: string;
  level: number;
}

function NavItemIcon({ itemIcon, drawerOpen, isSelected, iconSelectedColor, level }: NavItemIconProps) {
  if (itemIcon) {
    return (
      <ListItemIcon
        sx={(theme) => ({
          minWidth: 38,
          color: isSelected ? iconSelectedColor : 'secondary.main',
          ...theme.applyStyles('dark', { color: isSelected ? iconSelectedColor : 'secondary.400' }),
          ...(!drawerOpen &&
            level === 1 && {
            borderRadius: 1,
            width: 46,
            height: 46,
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': { bgcolor: 'secondary.200', ...theme.applyStyles('dark', { bgcolor: 'divider' }) },
            ...(isSelected && {
              bgcolor: 'primary.lighter',
              '&:hover': { bgcolor: 'primary.lighter' },
              ...theme.applyStyles('dark', { bgcolor: 'divider', '&:hover': { bgcolor: 'divider' } })
            })
          })
        })}
      >
        {itemIcon}
      </ListItemIcon>
    );
  }

  if (drawerOpen) {
    return (
      <ListItemIcon sx={{ minWidth: 30 }}>
        <Dot size={isSelected ? 6 : 5} color={isSelected ? 'primary' : 'secondary'} />
      </ListItemIcon>
    );
  }

  return null;
}

function NavItemActions({ actions, isSelected }: { actions: NavItemType['actions']; isSelected: boolean }) {
  if (!actions?.length) return null;

  return (
    <>
      {actions.map((action) => {
        const ActionIcon = action.icon as OverrideIcon;
        const isFunction = action.type === NavActionType.FUNCTION;

        return (
          <IconButton
            key={action.label || action.url || 'action'}
            {...(isFunction
              ? {
                  onClick: (event: React.MouseEvent) => {
                    event.stopPropagation();
                    action.function?.();
                  }
                }
              : {
                  component: Link,
                  to: action.url,
                  target: action.target ? '_blank' : '_self'
                })}
            color={isSelected ? 'primary' : 'secondary'}
            variant="outlined"
            sx={(theme) => ({
              position: 'absolute',
              top: 12,
              right: 10,
              zIndex: 1202,
              width: 20,
              height: 20,
              p: 0.25,
              borderColor: isSelected ? 'primary.light' : 'secondary.light',
              '&:hover': { borderColor: isSelected ? 'primary.main' : 'secondary.main' },
              ...theme.applyStyles('dark', { color: isSelected ? 'primary.main' : 'secondary.400' })
            })}
          >
            {ActionIcon && <ActionIcon size={12} style={{ marginLeft: 1 }} />}
          </IconButton>
        );
      })}
    </>
  );
}

export default function NavItemVertical({
  item,
  level,
  isSelected,
  drawerOpen,
  itemTarget,
  itemIcon,
  iconSelectedColor,
  onItemClick
}: NavItemVerticalProps) {
  const intl = useIntl();
  const showTextOrSub = drawerOpen || (!drawerOpen && level !== 1);
  const itemTitle = resolveItemTitle(item.title, intl.messages as Record<string, string>, intl);

  const itemButton = (
    <ListItemButton
      component={Link}
      to={item.url!}
      target={itemTarget}
      disabled={item.disabled}
      selected={isSelected}
      aria-label={!showTextOrSub && itemTitle ? itemTitle : undefined}
      sx={(theme) => ({
        zIndex: 1201,
        pl: getPaddingLeft(level, drawerOpen),
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen
          ? {
              '&:hover': { bgcolor: 'transparent' },
              '&.Mui-selected': { '&:hover': { bgcolor: 'transparent' }, bgcolor: 'transparent' },
              ...(level === 1 && {
                mx: 1.25,
                my: 0.5,
                borderRadius: 1,
                '&:hover': { bgcolor: 'secondary.200', ...theme.applyStyles('dark', { bgcolor: 'divider' }) }
              })
            }
          : {
              px: 2.75,
              justifyContent: 'center',
              '&:hover': { bgcolor: 'transparent' },
              '&.Mui-selected': { '&:hover': { bgcolor: 'transparent' }, bgcolor: 'transparent' }
            })
      })}
      onClick={onItemClick}
    >
      <NavItemIcon
        itemIcon={itemIcon}
        drawerOpen={drawerOpen}
        isSelected={isSelected}
        iconSelectedColor={iconSelectedColor}
        level={level}
      />

      {showTextOrSub && (
        <ListItemText
          primary={
            <Typography
              variant="h6"
              component="span"
              sx={(theme) => ({
                display: 'block',
                color: isSelected ? iconSelectedColor : 'secondary.main',
                ...theme.applyStyles('dark', { color: isSelected ? iconSelectedColor : 'secondary.400' }),
                fontWeight: isSelected ? 500 : 400
              })}
            >
              <SafeFormattedMessage id={item.title} />
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography variant="caption" component="span" color="text.secondary" sx={{ display: 'block' }}>
                <SafeFormattedMessage id={item.caption} />
              </Typography>
            )
          }
        />
      )}

      {showTextOrSub && item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={<SafeFormattedMessage id={item.chip.label as string} />}
          avatar={item.chip.avatar ? <Avatar>{item.chip.avatar}</Avatar> : undefined}
        />
      )}
    </ListItemButton>
  );

  return (
    <Box component="li" sx={{ position: 'relative', listStyle: 'none' }}>
      {!drawerOpen && level === 1 && Boolean(itemTitle) ? (
        <Tooltip title={itemTitle} placement="right">
          {itemButton}
        </Tooltip>
      ) : (
        itemButton
      )}

      {showTextOrSub && <NavItemActions actions={item?.actions} isSelected={isSelected} />}
    </Box>
  );
}
