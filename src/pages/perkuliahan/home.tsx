import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function PerkuliahanHomePage() {
  const intl = useIntl();

  return (
    <MainCard
      title={intl.formatMessage({
        id: 'perkuliahan.home-title',
        defaultMessage: 'Beranda Perkuliahan & Presensi'
      })}
    >
      <Typography variant="body1">
        <FormattedMessage
          id="perkuliahan.home-desc"
          defaultMessage="Selamat datang di Sub-Aplikasi Perkuliahan & Presensi. Modul ini digunakan untuk mengelola jadwal kelas, presensi mahasiswa, dan aktivitas perkuliahan harian."
        />
      </Typography>
    </MainCard>
  );
}
