import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { ArrowRight, CloudConnection, DocumentText, OceanProtocol, Code, LampCharge } from 'iconsax-reactjs';
import { useNavigate } from '@tanstack/react-router';
import { FormattedMessage, useIntl } from 'react-intl';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| EXAMPLE PAGES - HOME DASHBOARD ||============================== //

export default function ExampleHomePage() {
  const navigate = useNavigate();
  const intl = useIntl();

  const exampleFeatures = [
    {
      id: 'mock-client',
      title: intl.formatMessage({
        id: 'example.mock-client-title',
        defaultMessage: 'Data Mock (Client-Side Query)'
      }),
      subtitle: intl.formatMessage({
        id: 'example.mock-client-subtitle',
        defaultMessage: 'TanStack Query + React Table v8'
      }),
      description: intl.formatMessage({
        id: 'example.mock-client-desc',
        defaultMessage:
          'Contoh pengujian tabel data lengkap dengan caching TanStack Query, client-side filtering, sorting multi-kolom, dan pagination.'
      }),
      icon: DocumentText,
      color: 'primary',
      url: '/example/mock',
      badge: 'Client Query'
    },
    {
      id: 'mock-server',
      title: intl.formatMessage({
        id: 'example.mock-server-title',
        defaultMessage: 'Data Mock (Server-Side API)'
      }),
      subtitle: intl.formatMessage({
        id: 'example.mock-server-subtitle',
        defaultMessage: 'Nitro Server Endpoint + Server Pagination'
      }),
      description: intl.formatMessage({
        id: 'example.mock-server-desc',
        defaultMessage:
          'Contoh integrasi endpoint REST API server Nitro yang mendukung query parameter paginasi, dynamic search, dan sorting di sisi backend.'
      }),
      icon: CloudConnection,
      color: 'success',
      url: '/example/mock-server',
      badge: 'Server API'
    },
    {
      id: 'support-features',
      title: intl.formatMessage({
        id: 'example.support-features-title',
        defaultMessage: 'Fitur Menu & Template Showcase'
      }),
      subtitle: intl.formatMessage({
        id: 'example.support-features-subtitle',
        defaultMessage: 'Multi-Level Navigation & UI Showcase'
      }),
      description: intl.formatMessage({
        id: 'example.support-features-desc',
        defaultMessage:
          'Koleksi navigasi bertingkat (level 1 hingga 3), chip menu, disabled menu, dan tautan dokumentasi eksternal yang tersedia di sidebar menu.'
      }),
      icon: OceanProtocol,
      color: 'warning',
      url: '#',
      badge: 'Template Components'
    }
  ];

  return (
    <Stack spacing={3}>
      {/* HEADER HERO */}
      <MainCard>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ alignItems: 'flex-start' }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'primary.lighter',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Code size={36} variant="Bulk" />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                <FormattedMessage id="example.home-title" defaultMessage="Modul Example Pages" />
              </Typography>
              <Chip
                label={<FormattedMessage id="example.developer-sandbox" defaultMessage="Developer Sandbox" />}
                color="primary"
                size="small"
                variant="light"
                sx={{ fontWeight: 600 }}
              />
            </Stack>

            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.75, maxWidth: 800 }}>
              <FormattedMessage
                id="example.home-desc"
                defaultMessage="Modul ini berisi contoh halaman mock data, integrasi API, implementasi TanStack Query, React Table, serta berbagai contoh komponen navigasi menu untuk mempermudah referensi dan panduan pengembang saat membangun fitur baru di ekosistem SATU / LENS."
              />
            </Typography>
          </Box>
        </Stack>
      </MainCard>

      {/* FEATURE CARDS */}
      <Grid container spacing={3}>
        {exampleFeatures.map((item) => {
          const IconComponent = item.icon;

          return (
            <Grid size={{ xs: 12, md: 4 }} key={item.id}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
                  <Box>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={(theme) => ({
                          p: 1.25,
                          borderRadius: 2,
                          bgcolor: `${item.color}.lighter`,
                          color: `${item.color}.main`,
                          display: 'flex'
                        })}
                      >
                        <IconComponent size={24} variant="Bold" />
                      </Box>
                      <Chip label={item.badge} size="small" variant="outlined" color={item.color as any} sx={{ fontWeight: 600 }} />
                    </Stack>

                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {item.title}
                    </Typography>

                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, fontWeight: 500 }}>
                      {item.subtitle}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {item.description}
                    </Typography>
                  </Box>

                  {item.url !== '#' ? (
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<ArrowRight size={16} />}
                      onClick={() => navigate({ to: item.url as any })}
                      sx={{ mt: 3, borderRadius: 1.5, textTransform: 'none', fontWeight: 600 }}
                    >
                      <FormattedMessage id="example.open-page" defaultMessage="Buka Halaman" />
                    </Button>
                  ) : (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 3, fontStyle: 'italic', display: 'block' }}>
                      <FormattedMessage id="example.sidebar-others-note" defaultMessage="*Tersedia pada bagian menu 'Others' di sidebar" />
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* QUICK INFO & GUIDELINES */}
      <MainCard
        title={
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <LampCharge size={20} variant="Bold" />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <FormattedMessage id="example.guidelines-title" defaultMessage="Panduan Pengembangan Fitur Baru" />
            </Typography>
          </Stack>
        }
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                <FormattedMessage id="example.guidelines-1-title" defaultMessage="1. Menambahkan Halaman Baru ke Sub-App" />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <FormattedMessage
                  id="example.guidelines-1-desc"
                  defaultMessage="Buat komponen halaman di folder src/pages/[sub-app]/[feature].tsx, kemudian daftarkan file route di src/routes/_lens/[sub-app]/[feature].tsx menggunakan TanStack Router."
                />
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                <FormattedMessage id="example.guidelines-2-title" defaultMessage="2. Menambahkan Menu Navigasi" />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <FormattedMessage
                  id="example.guidelines-2-desc"
                  defaultMessage="Buka file menu di src/menu-items/[sub-app].ts dan tambahkan item baru dengan URL yang sesuai prefix sub-app."
                />
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </MainCard>
    </Stack>
  );
}
