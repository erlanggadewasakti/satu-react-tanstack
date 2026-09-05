import { MouseEvent } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useIntl } from 'react-intl';
import SubAppIcon from './SubAppIcon';

interface SubAppCollapsedButtonProps {
  appName: string;
  appId?: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

export default function SubAppCollapsedButton({ appName, appId, onClick }: SubAppCollapsedButtonProps) {
  const intl = useIntl();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
      <Tooltip title={`${intl.formatMessage({ id: 'menu.modul-app' })}: ${appName}`} placement="right">
        <IconButton
          onClick={onClick}
          color="primary"
          size="medium"
          sx={(theme) => ({
            width: 44,
            height: 44,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'primary.lighter',
              borderColor: 'primary.main',
              ...theme.applyStyles('dark', { bgcolor: 'secondary.100' })
            }
          })}
        >
          <SubAppIcon id={appId} size={20} variant="Bold" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
