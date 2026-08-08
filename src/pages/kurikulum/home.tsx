import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';

export default function KurikulumHomePage() {
  return (
    <MainCard title="Beranda Manajemen Kurikulum">
      <Typography variant="body1">
        Selamat datang di Sub-Aplikasi Manajemen Kurikulum. Modul ini digunakan untuk mengelola kurikulum berjalan, pemetaan CPLO/CPL, dan struktur mata kuliah.
      </Typography>
    </MainCard>
  );
}
