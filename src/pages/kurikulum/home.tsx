import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function KurikulumHomePage() {
  const intl = useIntl();

  return (
    <MainCard
      title={intl.formatMessage({
        id: 'kurikulum.home-title',
        defaultMessage: 'Beranda Manajemen Kurikulum'
      })}
    >
      <Typography variant="body1">
        <FormattedMessage
          id="kurikulum.home-desc"
          defaultMessage="Selamat datang di Sub-Aplikasi Manajemen Kurikulum. Modul ini digunakan untuk mengelola kurikulum berjalan, pemetaan CPLO/CPL, dan struktur mata kuliah."
        />
      </Typography>
    </MainCard>
  );
}
