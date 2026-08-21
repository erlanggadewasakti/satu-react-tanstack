import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function AkademikAdminHomePage() {
  const intl = useIntl();

  return (
    <MainCard
      title={intl.formatMessage({
        id: 'akademik-admin.home-title',
        defaultMessage: 'Beranda Akademik Administrator'
      })}
    >
      <Typography variant="body1">
        <FormattedMessage
          id="akademik-admin.home-desc"
          defaultMessage="Selamat datang di Sub-Aplikasi Akademik Administrator. Modul ini digunakan oleh administrator akademik untuk mengelola data master akademik dan sistem."
        />
      </Typography>
    </MainCard>
  );
}
