import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function AkademikAdminHomePage() {
  const intl = useIntl();

  return (
    <MainCard title={intl.formatMessage({ id: 'akademik-admin.home-title' })}>
      <Typography variant="body1">
        <FormattedMessage id="akademik-admin.home-desc" />
      </Typography>
    </MainCard>
  );
}
