import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function PortofolioHomePage() {
  const intl = useIntl();

  return (
    <MainCard title={intl.formatMessage({ id: 'portofolio.home-title' })}>
      <Typography variant="body1">
        <FormattedMessage id="portofolio.home-desc" />
      </Typography>
    </MainCard>
  );
}
