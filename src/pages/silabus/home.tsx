import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function SilabusHomePage() {
  const intl = useIntl();

  return (
    <MainCard
      title={intl.formatMessage({
        id: 'silabus.home-title',
        defaultMessage: 'Beranda Silabus (SUB CLO & RPS)'
      })}
    >
      <Typography variant="body1">
        <FormattedMessage
          id="silabus.home-desc"
          defaultMessage="Selamat datang di Sub-Aplikasi Silabus (SUB CLO & RPS). Modul ini digunakan untuk pengelolaan Sub-CLO, penyusunan, dan verifikasi Rencana Pembelajaran Semester."
        />
      </Typography>
    </MainCard>
  );
}
