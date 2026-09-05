import { MouseEvent, useState } from 'react';
import { useIntl } from 'react-intl';

// project-imports
import useSubApp from 'hooks/useSubApp';
import SubAppCollapsedButton from './sub-app/SubAppCollapsedButton';
import SubAppExpandedButton from './sub-app/SubAppExpandedButton';
import SubAppMenu from './sub-app/SubAppMenu';

interface Props {
  collapsed?: boolean;
}

// ==============================|| SUB-APP SELECTOR ("MODUL APP") ||============================== //

export default function SubAppSelector({ collapsed }: Props) {
  const intl = useIntl();
  const { activeSubApp, subApps, changeSubApp } = useSubApp();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (appId: string) => {
    changeSubApp(appId);
    handleClose();
  };

  const appName = activeSubApp ? intl.formatMessage({ id: `subapp.${activeSubApp.id}.name` as any }) : '';

  return (
    <>
      {collapsed ? (
        <SubAppCollapsedButton appName={appName} appId={activeSubApp?.id} onClick={handleClick} />
      ) : (
        <SubAppExpandedButton appName={appName} appId={activeSubApp?.id} open={open} onClick={handleClick} />
      )}

      <SubAppMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        subApps={subApps}
        activeSubApp={activeSubApp}
        onSelect={handleSelect}
        isMini={Boolean(collapsed)}
      />
    </>
  );
}
