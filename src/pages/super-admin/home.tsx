import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function SuperAdminHomePage() {
  const intl = useIntl();

  return (
    <MainCard title={intl.formatMessage({ id: 'super-admin.home-title' })}>
      <Typography variant="body1">
        <FormattedMessage id="super-admin.home-desc" />
      </Typography>
    </MainCard>
  );
}
