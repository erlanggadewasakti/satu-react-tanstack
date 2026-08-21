import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function PenilaianHomePage() {
  const intl = useIntl();

  return (
    <MainCard
      title={intl.formatMessage({
        id: 'penilaian.home-title',
        defaultMessage: 'Beranda Penilaian & Evaluasi'
      })}
    >
      <Typography variant="body1">
        <FormattedMessage
          id="penilaian.home-desc"
          defaultMessage="Selamat datang di Sub-Aplikasi Penilaian & Evaluasi. Modul ini digunakan untuk input nilai, pembobotan asesmen, dan pengaturan periode input nilai."
        />
      </Typography>
    </MainCard>
  );
}
