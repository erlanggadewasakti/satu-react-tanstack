import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function KurikulumHomePage() {
  const intl = useIntl();

  return (
    <MainCard title={intl.formatMessage({ id: 'kurikulum.home-title' })}>
      <Typography variant="body1">
        <FormattedMessage id="kurikulum.home-desc" />
      </Typography>
    </MainCard>
  );
}
