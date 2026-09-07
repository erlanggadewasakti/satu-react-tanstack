import { Link, useLocation } from '@tanstack/react-router';
import { CSSProperties, ReactElement, useMemo } from 'react';

// material-ui
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// project-imports
import SafeFormattedMessage from 'components/@extended/SafeFormattedMessage';
import MainCard from 'components/MainCard';
import { ThemeDirection } from 'config';
import useSubApp from 'hooks/useSubApp';
import navigation, { menuItemsBySubApp } from 'menu-items';

// assets
import { ArrowRight2, Buildings2, Home3 } from 'iconsax-reactjs';

// types
import { NavItemType } from 'types/menu';
import { OverrideIcon } from 'types/root';

export interface BreadcrumbLinkProps {
  title: string;
  to?: string;
  icon?: string | OverrideIcon;
}

interface BreadCrumbSxProps extends CSSProperties {
  mb?: string;
  bgcolor?: string;
}

interface Props {
  card?: boolean;
  custom?: boolean;
  divider?: boolean;
  heading?: string;
  icon?: boolean;
  icons?: boolean;
  links?: BreadcrumbLinkProps[];
  maxItems?: number;
  rightAlign?: boolean;
  separator?: OverrideIcon;
  title?: boolean;
  titleBottom?: boolean;
  sx?: BreadCrumbSxProps;
  [key: string]: any;
}

// ==============================|| HELPER - TREE SEARCH ||============================== //

function matchesUrl(menuUrl?: string, target?: string) {
  if (!menuUrl || !target) return false;
  const cleanMenu = menuUrl.endsWith('/') && menuUrl.length > 1 ? menuUrl.slice(0, -1) : menuUrl;
  const cleanTarget = target.endsWith('/') && target.length > 1 ? target.slice(0, -1) : target;
  return cleanMenu === cleanTarget;
}

function findInCollapse(
  children: NavItemType[],
  targetPath: string,
  parent: NavItemType
): { main?: NavItemType; item?: NavItemType } | null {
  for (const child of children) {
    if (child.type === 'collapse') {
      if (matchesUrl(child.url, targetPath)) {
        return { main: child, item: child };
      }
      if (child.children) {
        const nested = findInCollapse(child.children, targetPath, child);
        if (nested) return nested;
      }
    } else if (child.type === 'item') {
      if (matchesUrl(child.url, targetPath)) {
        return { main: parent, item: child };
      }
    }
  }
  return null;
}

function findActiveBreadcrumbs(items: NavItemType[] | undefined, targetPath: string): { main?: NavItemType; item?: NavItemType } {
  if (!items) return {};

  for (const menu of items) {
    if (menu.type === 'group') {
      if (matchesUrl(menu.url, targetPath)) {
        return { main: menu, item: menu };
      }
      if (menu.children) {
        const found = findInCollapse(menu.children, targetPath, menu);
        if (found) return found;
      }
    } else if (menu.type === 'collapse') {
      if (matchesUrl(menu.url, targetPath)) {
        return { main: menu, item: menu };
      }
      if (menu.children) {
        const found = findInCollapse(menu.children, targetPath, menu);
        if (found) return found;
      }
    } else if (menu.type === 'item') {
      if (matchesUrl(menu.url, targetPath)) {
        return { main: menu, item: menu };
      }
    }
  }
  return {};
}

function getCardStyle(card?: boolean, sx?: BreadCrumbSxProps) {
  if (card) {
    return { mb: 3, ...sx };
  }
  return { mb: 3, bgcolor: 'transparent', borderRadius: 0, overflow: 'visible', boxShadow: 'none', ...sx };
}

// ==============================|| CUSTOM HOOK ||============================== //

function useBreadcrumbs({ custom, heading }: { custom?: boolean; heading?: string }) {
  const location = useLocation();
  const { menuItems: activeMenuItems } = useSubApp();

  const { main, item } = useMemo(() => {
    if (custom) return {};
    let customLocation = location.pathname;
    if (customLocation.includes('/components-overview/breadcrumbs')) {
      customLocation = '/apps/customer/customer-card';
    }

    // 1. Cari di menu sub-app yang sedang aktif
    let found = findActiveBreadcrumbs(activeMenuItems, customLocation);
    if (found.main || found.item) return found;

    // 2. Fallback: Cari di seluruh sub-app jika route berasal dari sub-app lain
    for (const subAppKey of Object.keys(menuItemsBySubApp)) {
      found = findActiveBreadcrumbs(menuItemsBySubApp[subAppKey]?.items, customLocation);
      if (found.main || found.item) return found;
    }

    // 3. Fallback: Cari di menu statis global
    return findActiveBreadcrumbs(navigation?.items, customLocation);
  }, [custom, location.pathname, activeMenuItems]);

  // Sembunyikan jika item atau grup induknya menentukan breadcrumbs: false (Cara 1)
  const isHidden = item?.breadcrumbs === false || (main?.breadcrumbs === false && item?.breadcrumbs !== true);
  const hasItem = Boolean(item || main);
  const isVisible = Boolean(custom || (!isHidden && hasItem));
  const pageTitle = custom ? heading : item?.title || main?.title;

  return { main, item, isVisible, pageTitle };
}

// ==============================|| SUBCOMPONENTS ||============================== //

function HomeIcon({ icon, icons, iconSX }: { icon?: boolean; icons?: boolean; iconSX: CSSProperties }) {
  if (icons) {
    return <Home3 style={iconSX} />;
  }
  if (icon) {
    return <Home3 variant="Bold" style={{ ...iconSX, marginRight: 0 }} />;
  }
  return <SafeFormattedMessage id="home" />;
}

function CustomBreadcrumbTrail({
  links,
  maxItems = 8,
  separatorIcon,
  iconSX
}: {
  links: BreadcrumbLinkProps[];
  maxItems?: number;
  separatorIcon: ReactElement;
  iconSX: CSSProperties;
}) {
  return (
    <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems} separator={separatorIcon}>
      {links.map((link) => {
        const CollapseIcon = (link.icon as OverrideIcon) || Buildings2;
        return (
          <Typography
            key={link.to || link.title}
            {...(link.to && { component: Link, to: link.to })}
            variant="body1"
            sx={{ textDecoration: 'none', fontWeight: link.to ? 400 : 500, cursor: link.to ? 'pointer' : 'default' }}
            color={link.to ? 'text.secondary' : 'text.primary'}
          >
            {link.icon && <CollapseIcon style={iconSX} />}
            <SafeFormattedMessage id={link.title} />
          </Typography>
        );
      })}
    </MuiBreadcrumbs>
  );
}

function DefaultBreadcrumbTrail({
  main,
  item,
  icon,
  icons,
  maxItems = 8,
  separatorIcon,
  iconSX
}: {
  main?: NavItemType;
  item?: NavItemType;
  icon?: boolean;
  icons?: boolean;
  maxItems?: number;
  separatorIcon: ReactElement;
  iconSX: CSSProperties;
}) {
  const location = useLocation();
  const CollapseIcon = main?.icon || Buildings2;
  const ItemIcon = item?.icon || Buildings2;

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems} separator={separatorIcon}>
      <Typography
        component={Link}
        to="/"
        color="text.secondary"
        variant="body1"
        sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
      >
        <HomeIcon icon={icon} icons={icons} iconSX={iconSX} />
      </Typography>

      {main && main.type === 'collapse' && !main.breadcrumbs && (
        <Typography
          {...(main.url && { component: Link, to: main.url })}
          variant="body1"
          sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          color={location.pathname === main.url ? 'text.primary' : 'text.secondary'}
        >
          {icons && <CollapseIcon style={iconSX} />}
          <SafeFormattedMessage id={main.title} />
        </Typography>
      )}

      {item && (
        <Typography variant="body1" color="text.primary" sx={{ display: 'flex', fontWeight: 500, alignItems: 'center' }}>
          {icons && <ItemIcon style={iconSX} />}
          <SafeFormattedMessage id={item.title} />
        </Typography>
      )}
    </MuiBreadcrumbs>
  );
}

function BreadcrumbHeading({
  title,
  titleBottom,
  isTop,
  pageTitle,
  card
}: {
  title: boolean;
  titleBottom: boolean;
  isTop: boolean;
  pageTitle?: string;
  card?: boolean;
}) {
  const shouldShow = isTop ? title && !titleBottom : title && titleBottom;
  if (!shouldShow || !pageTitle) return null;

  return (
    <Grid sx={{ mt: isTop || card === false ? 0 : 1 }}>
      <Typography variant="h2">
        <SafeFormattedMessage id={pageTitle} />
      </Typography>
    </Grid>
  );
}

function BreadcrumbTrailContent({
  custom,
  links,
  main,
  item,
  icon,
  icons,
  maxItems,
  separatorIcon,
  iconSX
}: {
  custom?: boolean;
  links?: BreadcrumbLinkProps[];
  main?: NavItemType;
  item?: NavItemType;
  icon?: boolean;
  icons?: boolean;
  maxItems?: number;
  separatorIcon: ReactElement;
  iconSX: CSSProperties;
}) {
  if (custom && links && links.length > 0) {
    return <CustomBreadcrumbTrail links={links} maxItems={maxItems} separatorIcon={separatorIcon} iconSX={iconSX} />;
  }
  return (
    <DefaultBreadcrumbTrail
      main={main}
      item={item}
      icon={icon}
      icons={icons}
      maxItems={maxItems}
      separatorIcon={separatorIcon}
      iconSX={iconSX}
    />
  );
}

// ==============================|| BREADCRUMBS ||============================== //

export default function Breadcrumbs(props: Props) {
  const {
    card = false,
    custom = false,
    divider = false,
    heading,
    icon,
    icons,
    links,
    maxItems,
    rightAlign,
    separator,
    title = true,
    titleBottom = true,
    sx,
    ...others
  } = props;

  const theme = useTheme();
  const { main, item, isVisible, pageTitle } = useBreadcrumbs({ custom, heading });

  if (!isVisible) {
    return null;
  }

  const isRtl = theme.direction === ThemeDirection.RTL;
  const iconSX: CSSProperties = {
    marginRight: isRtl ? 0 : theme.spacing(0.75),
    marginLeft: isRtl ? theme.spacing(0.75) : 0,
    width: '1rem',
    height: '1rem',
    color: theme.vars.palette.secondary.main
  };

  const SeparatorIcon = separator;
  const separatorIcon = SeparatorIcon ? <SeparatorIcon size={12} /> : <ArrowRight2 size={12} />;

  return (
    <MainCard border={card} content={card} boxShadow={false} sx={getCardStyle(card, sx)} {...others}>
      <Grid
        container
        direction={rightAlign ? 'row' : ('column' as any)}
        spacing={0.5}
        sx={{
          justifyContent: rightAlign ? 'space-between' : 'flex-start',
          alignItems: rightAlign ? 'center' : 'flex-start'
        }}
      >
        <BreadcrumbHeading title={title} titleBottom={titleBottom} isTop pageTitle={pageTitle} card={card} />
        <Grid>
          <BreadcrumbTrailContent
            custom={custom}
            links={links}
            main={main}
            item={item}
            icon={icon}
            icons={icons}
            maxItems={maxItems}
            separatorIcon={separatorIcon}
            iconSX={iconSX}
          />
        </Grid>
        <BreadcrumbHeading title={title} titleBottom={titleBottom} isTop={false} pageTitle={pageTitle} card={card} />
      </Grid>
      {!card && Boolean(divider) && <Divider sx={{ mt: 2 }} />}
    </MainCard>
  );
}
