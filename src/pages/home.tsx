import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { ArrowRight, CallCalling, Category, ExportSquare } from 'iconsax-reactjs';
import { FormattedMessage, useIntl } from 'react-intl';

// project-imports
import lensHeroImg from 'assets/images/lens-hero.png';
import MainCard from 'components/MainCard';
import useSubApp from 'hooks/useSubApp';

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
              <Typography variant="h2" sx={{ color: 'error.main' }}>
                <FormattedMessage id="home.welcome-title" />
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, textAlign: 'justify' }}>
                <FormattedMessage
                  id="home.lens-desc-1"
                  values={{
                    strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>
                  }}
                />
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, textAlign: 'justify' }}>
                <FormattedMessage id="home.lens-desc-2" />
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </MainCard>

      {/* QUICK ACTION SUB-APPS LIST */}
      <MainCard
        title={
          <Typography variant="h3">
            <FormattedMessage id="home.available-sub-apps" />
          </Typography>
        }
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          <FormattedMessage id="home.sub-apps-guide" />
        </Typography>

        <Grid container spacing={3}>
          {subApps.map((app) => {
            const localizedAppName = intl.formatMessage({ id: `subapp.${app.id}.name` as any });
            const localizedAppDesc = app.description ? intl.formatMessage({ id: `subapp.${app.id}.desc` as any }) : '';

            return (
              <Grid key={app.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    borderColor: 'divider',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: (theme) => (theme as any).customShadows.z1,
                      borderColor: 'primary.light'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Stack direction="row" spacing={1.5} sx={{ mb: 1.5, alignItems: 'center' }}>
                        <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'primary.lighter', color: 'primary.main', display: 'flex' }} aria-hidden="true">
                          <Category size={22} />
                        </Box>
                        <Typography variant="h5" component="h4">{localizedAppName}</Typography>
                      </Stack>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {localizedAppDesc}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<ArrowRight size={16} aria-hidden="true" />}
                      onClick={() => changeSubApp(app.id)}
                      sx={{ mt: 2, borderRadius: 1.5, textTransform: 'none', fontWeight: 600 }}
                    >
                      <FormattedMessage id="home.open-sub-app" />
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
            <CallCalling size={22} aria-hidden="true" />
            <Typography variant="h3">
              <FormattedMessage id="home.contact-info" />
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
              <FormattedMessage id="home.service-desk" />{' '}
              <Typography
                variant="inherit"
                component="a"
                href="https://wa.me/6282319949941"
                target="_blank"
                rel="noopener noreferrer"
                sx={(theme) => ({
                  color: 'success.darker',
                  fontWeight: 700,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                  ...(theme.applyStyles && theme.applyStyles('dark', { color: 'success.light' }))
                })}
              >
                +62 823-1994-9941 <ExportSquare size={14} aria-hidden="true" style={{ verticalAlign: 'middle' }} />
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
              variant="body1"
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
              <FormattedMessage id="home.user-manual-link" /> <ExportSquare size={16} />
            </Typography>
          </Stack>
        </Stack>
      </MainCard>
    </Stack>
  );
}
