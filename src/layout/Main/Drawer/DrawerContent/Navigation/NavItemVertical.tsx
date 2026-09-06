import { Link } from '@tanstack/react-router';
import { Activity, ReactNode } from 'react';

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

  const messages = intl.messages as Record<string, string>;
  const itemTitle =
    typeof item.title === 'string' && item.title.trim().length > 0
      ? (messages[item.title] ? intl.formatMessage({ id: item.title as any }) : item.title)
      : '';

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
        pl: level === 2 ? 3.25 : drawerOpen ? (level <= 3 ? (level * 20) / 8 : (level * 20 + (level - 3) * 10) / 8) : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen && {
          '&:hover': { bgcolor: 'transparent' },
          '&.Mui-selected': { '&:hover': { bgcolor: 'transparent' }, bgcolor: 'transparent' }
        }),
        ...(drawerOpen &&
          level === 1 && {
          mx: 1.25,
          my: 0.5,
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.200', ...theme.applyStyles('dark', { bgcolor: 'divider' }) }
        }),
        ...(!drawerOpen && {
          px: 2.75,
          justifyContent: 'center',
          '&:hover': { bgcolor: 'transparent' },
          '&.Mui-selected': { '&:hover': { bgcolor: 'transparent' }, bgcolor: 'transparent' }
        })
      })}
      onClick={onItemClick}
    >
      <Activity mode={itemIcon ? 'visible' : 'hidden'}>
        <ListItemIcon
          sx={(theme) => ({
            minWidth: 38,
            color: 'secondary.main',
            ...theme.applyStyles('dark', { color: 'secondary.400' }),
            ...(isSelected && { color: iconSelectedColor }),
            ...(!drawerOpen &&
              level === 1 && {
              borderRadius: 1,
              width: 46,
              height: 46,
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': { bgcolor: 'secondary.200', ...theme.applyStyles('dark', { bgcolor: 'divider' }) }
            }),
            ...(!drawerOpen &&
              isSelected && {
              bgcolor: 'primary.lighter',
              '&:hover': { bgcolor: 'primary.lighter' },
              ...theme.applyStyles('dark', { bgcolor: 'divider', '&:hover': { bgcolor: 'divider' } })
            })
          })}
        >
          {itemIcon}
        </ListItemIcon>
      </Activity>

      <Activity mode={!itemIcon && drawerOpen ? 'visible' : 'hidden'}>
        <ListItemIcon sx={{ minWidth: 30 }}>
          <Dot size={isSelected ? 6 : 5} color={isSelected ? 'primary' : 'secondary'} />
        </ListItemIcon>
      </Activity>

      <Activity mode={showTextOrSub ? 'visible' : 'hidden'}>
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
      </Activity>

      {showTextOrSub && item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={<SafeFormattedMessage id={item.chip.label as string} />}
          avatar={
            <Activity mode={item.chip.avatar ? 'visible' : 'hidden'}>
              <Avatar>{item.chip.avatar}</Avatar>
            </Activity>
          }
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

      {showTextOrSub &&
        item?.actions &&
        item?.actions.map((action) => {
          const ActionIcon = action.icon as OverrideIcon;
          const callAction = action?.function;

          return (
            <IconButton
              key={action.label || action.url || 'action'}
              {...(action.type === NavActionType.FUNCTION && {
                onClick: (event) => {
                  event.stopPropagation();
                  callAction();
                }
              })}
              {...(action.type === NavActionType.LINK && {
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
    </Box>
  );
}
