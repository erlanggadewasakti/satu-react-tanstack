import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';

export default function SuperAdminHomePage() {
  return (
    <MainCard title="Beranda Super Admin">
      <Typography variant="body1">
        Selamat datang di Sub-Aplikasi Super Admin. Modul ini menyediakan kontrol penuh manajemen sistem, user, dan hak akses.
      </Typography>
    </MainCard>
  );
}
