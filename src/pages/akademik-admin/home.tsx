import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';

export default function AkademikAdminHomePage() {
  return (
    <MainCard title="Beranda Akademik Administrator">
      <Typography variant="body1">
        Selamat datang di Sub-Aplikasi Akademik Administrator. Modul ini digunakan oleh administrator akademik untuk mengelola data master akademik dan sistem.
      </Typography>
    </MainCard>
  );
}
