import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function PenilaianHomePage() {
  const intl = useIntl();

  return (
    <MainCard title={intl.formatMessage({ id: 'penilaian.home-title' })}>
      <Typography variant="body1">
        <FormattedMessage id="penilaian.home-desc" />
      </Typography>
    </MainCard>
  );
}
