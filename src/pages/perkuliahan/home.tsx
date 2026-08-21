import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function PerkuliahanHomePage() {
  const intl = useIntl();

  return (
    <MainCard title={intl.formatMessage({ id: 'perkuliahan.home-title' })}>
      <Typography variant="body1">
        <FormattedMessage id="perkuliahan.home-desc" />
      </Typography>
    </MainCard>
  );
}
