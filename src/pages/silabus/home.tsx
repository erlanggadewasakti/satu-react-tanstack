import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function SilabusHomePage() {
  const intl = useIntl();

  return (
    <MainCard title={intl.formatMessage({ id: 'silabus.home-title' })}>
      <Typography variant="body1">
        <FormattedMessage id="silabus.home-desc" />
      </Typography>
    </MainCard>
  );
}
