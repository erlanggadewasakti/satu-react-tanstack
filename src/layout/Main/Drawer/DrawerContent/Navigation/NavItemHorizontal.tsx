import { Activity, ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

// material-ui
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// project-imports
import SafeFormattedMessage from 'components/@extended/SafeFormattedMessage';

// types
import { LinkTarget, NavItemType } from 'types/menu';

interface NavItemHorizontalProps {
  item: NavItemType;
  level: number;
  isParents: boolean;
  isSelected: boolean;
  drawerOpen: boolean;
  itemTarget: LinkTarget;
  itemIcon: ReactNode;
  iconSelectedColor: string;
  onItemClick: () => void;
}

export default function NavItemHorizontal({
  item,
  level,
  isParents,
  isSelected,
  drawerOpen,
  itemTarget,
  itemIcon,
  iconSelectedColor,
  onItemClick
}: NavItemHorizontalProps) {
  return (
    <ListItemButton
      component={Link}
      to={item.url!}
      target={itemTarget}
      disabled={item.disabled}
      selected={isSelected}
      sx={(theme) => ({
        zIndex: 1201,
        borderRadius: !isParents && level >= 1 ? 0 : 1,
        height: 46,
        ...(isParents && { color: 'secondary.main', ...theme.applyStyles('dark', { color: 'secondary.400' }), p: 1, mr: 1 }),
        ...(!isParents && {
          '&.Mui-selected': {
            bgcolor: 'transparent',
            color: iconSelectedColor,
            '&:hover': {
              color: iconSelectedColor,
              bgcolor: 'transparent'
            }
          }
        })
      })}
      onClick={onItemClick}
    >
      <Activity mode={itemIcon ? 'visible' : 'hidden'}>
        <ListItemIcon
          sx={{
            minWidth: 36,
            ...(!drawerOpen && {
              borderRadius: 1,
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'flex-start',
              '&:hover': { bgcolor: 'transparent' }
            }),
            ...(!drawerOpen && isSelected && { bgcolor: 'transparent', '&:hover': { bgcolor: 'transparent' } })
          }}
        >
          {itemIcon}
        </ListItemIcon>
      </Activity>

      <ListItemText
        primary={
          <Typography
            variant="h6"
            component="span"
            sx={(theme) => ({
              color: isSelected ? iconSelectedColor : 'secondary.main',
              ...theme.applyStyles('dark', { color: isSelected ? iconSelectedColor : 'secondary.400' }),
              fontWeight: isSelected ? 500 : 400
            })}
          >
            <SafeFormattedMessage id={item.title} />
          </Typography>
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={
            <Activity mode={item.chip.avatar ? 'visible' : 'hidden'}>
              <Avatar>{item.chip.avatar}</Avatar>
            </Activity>
          }
          sx={{ ml: 1 }}
        />
      )}
    </ListItemButton>
  );
}
