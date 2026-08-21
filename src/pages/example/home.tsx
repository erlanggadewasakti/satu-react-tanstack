import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { ArrowRight, CloudConnection, DocumentText, OceanProtocol, Code, Hierarchy, LampCharge } from 'iconsax-reactjs';
import { useNavigate } from '@tanstack/react-router';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| EXAMPLE PAGES - HOME DASHBOARD ||============================== //

export default function ExampleHomePage() {
  const navigate = useNavigate();

  const exampleFeatures = [
    {
      id: 'mock-client',
      title: 'Data Mock (Client-Side Query)',
      subtitle: 'TanStack Query + React Table v8',
      description:
        'Contoh pengujian tabel data lengkap dengan caching TanStack Query, client-side filtering, sorting multi-kolom, dan pagination.',
      icon: DocumentText,
      color: 'primary',
      url: '/example/mock',
      badge: 'Client Query'
    },
    {
      id: 'mock-server',
      title: 'Data Mock (Server-Side API)',
      subtitle: 'Nitro Server Endpoint + Server Pagination',
      description:
        'Contoh integrasi endpoint REST API server Nitro yang mendukung query parameter paginasi, dynamic search, dan sorting di sisi backend.',
      icon: CloudConnection,
      color: 'success',
      url: '/example/mock-server',
      badge: 'Server API'
    },
    {
      id: 'support-features',
      title: 'Fitur Menu & Template Showcase',
      subtitle: 'Multi-Level Navigation & UI Showcase',
      description:
        'Koleksi navigasi bertingkat (level 1 hingga 3), chip menu, disabled menu, dan tautan dokumentasi eksternal yang tersedia di sidebar menu.',
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
                Modul Example Pages
              </Typography>
              <Chip label="Developer Sandbox" color="primary" size="small" variant="light" sx={{ fontWeight: 600 }} />
            </Stack>

            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.75, maxWidth: 800 }}>
              Modul ini berisi contoh halaman mock data, integrasi API, implementasi TanStack Query, React Table, serta berbagai contoh
              komponen navigasi menu untuk mempermudah referensi dan panduan pengembang saat membangun fitur baru di ekosistem SATU / LENS.
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
                      Buka Halaman
                    </Button>
                  ) : (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 3, fontStyle: 'italic', display: 'block' }}>
                      *Tersedia pada bagian menu "Others" di sidebar
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
              Panduan Pengembangan Fitur Baru
            </Typography>
          </Stack>
        }
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                1. Menambahkan Halaman Baru ke Sub-App
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Buat komponen halaman di folder <code>src/pages/[sub-app]/[feature].tsx</code>, kemudian daftarkan file route di{' '}
                <code>src/routes/_lens/[sub-app]/[feature].tsx</code> menggunakan TanStack Router.
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                2. Menambahkan Menu Navigasi
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Buka file menu di <code>src/menu-items/[sub-app].ts</code> dan tambahkan item baru dengan URL yang sesuai prefix sub-app.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </MainCard>
    </Stack>
  );
}
