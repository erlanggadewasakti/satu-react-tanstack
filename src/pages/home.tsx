import { Box, Grid, Typography, Card, CardContent, Button, Stack, Chip } from '@mui/material';
import { CallCalling, ExportSquare, ArrowRight, Category } from 'iconsax-reactjs';
import { FormattedMessage, useIntl } from 'react-intl';

// project-imports
import MainCard from 'components/MainCard';
import useSubApp from 'hooks/useSubApp';
import lensHeroImg from 'assets/images/lens-hero.png';

const USER_MANUAL_LINK =
  'https://telkomuniversityofficial-my.sharepoint.com/:f:/g/personal/devops_telkomuniversity_ac_id/EnBo4K4hxwBKnNO0zNKBb7cBLsk0o9YqOC023KAk9_wGHw?e=rVOGXh';

// ==============================|| UNIVERSAL HOME PAGE ||============================== //

export default function UniversalHomePage() {
  const intl = useIntl();
  const { subApps, changeSubApp } = useSubApp();

  return (
    <Stack spacing={3}>
      {/* HERO WELCOME SECTION */}
      <MainCard sx={{ overflow: 'hidden', p: { xs: 1, md: 2 } }}>
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
              <Box
                component="img"
                src={lensHeroImg}
                alt="LENS Illustration"
                sx={{ width: '100%', maxWidth: 480, height: 'auto', objectFit: 'contain' }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Typography variant="h2" sx={{ fontWeight: 700, color: 'error.main' }}>
                <FormattedMessage id="home.welcome-title" defaultMessage="Selamat Datang di Sistem Informasi LENS" />
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, textAlign: 'justify' }}>
                <FormattedMessage
                  id="home.lens-desc-1"
                  defaultMessage="<strong>Learning Outcome Based Information System (LENS)</strong> adalah metodologi pendidikan yang mengutamakan pencapaian hasil pembelajaran yang terukur dan bermakna. Platform ini menyediakan tools komprehensif untuk manajemen kurikulum, penilaian CLO (Course Learning Outcomes), dan evaluasi pencapaian PLO (Program Learning Outcomes)."
                  values={{
                    strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>
                  }}
                />
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, textAlign: 'justify' }}>
                <FormattedMessage
                  id="home.lens-desc-2"
                  defaultMessage="Sistem LENS memungkinkan dosen dan koordinator program studi untuk melakukan pemetaan kurikulum, monitoring pencapaian target pembelajaran, dan analisis continuous improvement. Semua stakeholder dapat memantau progress akademik secara real-time melalui dashboard yang terintegrasi dengan standar akreditasi nasional dan internasional."
                />
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </MainCard>

      {/* QUICK ACTION SUB-APPS LIST */}
      <MainCard
        title={intl.formatMessage({
          id: 'home.available-sub-apps',
          defaultMessage: 'Sub-Aplikasi Tersedia (Akses Cepat)'
        })}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          <FormattedMessage
            id="home.sub-apps-guide"
            defaultMessage="Klik modul di bawah ini untuk langsung menuju sub-aplikasi yang sesuai dengan peranan (role) Anda."
          />
        </Typography>

        <Grid container spacing={2.5}>
          {subApps.map((app) => {
            const localizedAppName = intl.formatMessage({
              id: `subapp.${app.id}.name`,
              defaultMessage: app.name
            });
            const localizedAppDesc = app.description
              ? intl.formatMessage({
                  id: `subapp.${app.id}.desc`,
                  defaultMessage: app.description
                })
              : '';

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={app.id}>
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
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Stack direction="row" spacing={1.5} sx={{ mb: 1.5, alignItems: 'center' }}>
                        <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'primary.lighter', color: 'primary.main', display: 'flex' }}>
                          <Category size={22} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          {localizedAppName}
                        </Typography>
                      </Stack>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {localizedAppDesc}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<ArrowRight size={16} />}
                      onClick={() => changeSubApp(app.id)}
                      sx={{ mt: 2, borderRadius: 1.5, textTransform: 'none', fontWeight: 600 }}
                    >
                      <FormattedMessage id="home.open-sub-app" defaultMessage="Buka Sub-App" />
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </MainCard>

      {/* KONTAK INFORMASI SECTION */}
      <MainCard
        title={
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <CallCalling size={22} />
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              <FormattedMessage id="home.contact-info" defaultMessage="Kontak Informasi" />
            </Typography>
          </Stack>
        }
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Chip
              label="1"
              size="small"
              sx={{ bgcolor: 'primary.main', color: 'common.white', fontWeight: 700, borderRadius: 1, minWidth: 24 }}
            />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              <FormattedMessage
                id="home.service-desk"
                defaultMessage="Service Desk Direktorat Pusat Teknologi Informasi (PUTI):"
              />{' '}
              <Typography
                component="a"
                href="https://wa.me/6282319949941"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'success.main', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                +62 823-1994-9941 <ExportSquare size={14} style={{ verticalAlign: 'middle' }} />
              </Typography>
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Chip
              label="2"
              size="small"
              sx={{ bgcolor: 'primary.main', color: 'common.white', fontWeight: 700, borderRadius: 1, minWidth: 24 }}
            />
            <Typography
              component="a"
              href={USER_MANUAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              <FormattedMessage id="home.user-manual-link" defaultMessage="Link User Manual" /> <ExportSquare size={16} />
            </Typography>
          </Stack>
        </Stack>
      </MainCard>
    </Stack>
  );
}
