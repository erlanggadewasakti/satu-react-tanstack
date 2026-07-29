// material-ui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// third-party
import { motion } from 'framer-motion';

// project-imports
import Logo from 'components/logo';

// assets
import GithubFilledIcon from 'assets/third-party/githubFilled';
import LinkeDinIcon from 'assets/third-party/linkedin';

import { Dribbble, Facebook, Youtube } from 'iconsax-reactjs';

// link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.vars.palette.text.primary,
  '&:hover, &:active': {
    color: theme.vars.palette.primary.main
  }
}));

type showProps = {
  isFull?: boolean;
};

// ==============================|| LANDING - FOOTER PAGE ||============================== //

export default function FooterBlock({ isFull }: showProps) {
  const linkSX = { color: 'text.secondary', fontWeight: 400, opacity: '0.6', cursor: 'pointer', '&:hover': { opacity: '1' } };

  const EcoSystem = [
    {
      label: 'Bundle',
      link: 'https://codedthemes.com/item/able-pro-dashboard-templates'
    },
    {
      label: 'Bootstrap',
      link: 'https://codedthemes.com/item/able-pro-bootstrap-admin-template/'
    },
    {
      label: 'Angular',
      link: 'https://codedthemes.com/item/able-pro-angular-admin-template/'
    },
    {
      label: 'React',
      link: 'https://codedthemes.com/item/able-pro-mui-react-admin-template/'
    },
    {
      label: 'Next',
      link: 'https://codedthemes.com/item/able-pro-nextjs-mui-react-admin-template/'
    },
    {
      label: 'Tailwind',
      link: 'https://codedthemes.com/item/able-pro-tailwind-css-admin-dashboard/'
    },
    {
      label: 'Vue',
      link: 'https://codedthemes.com/item/able-pro-tailwind-css-admin-dashboard/'
    },
    {
      label: 'Vue + Laravel',
      link: 'https://codedthemes.com/item/able-pro-vue-laravel-admin-dashboard'
    }
  ];

  return (
    <>
      <Box sx={{ mt: isFull ? 0 : 10, pt: isFull ? 5 : 10, pb: 10, bgcolor: 'secondary.200', borderColor: 'divider' }}>
        <Container>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Logo to="/" />
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 400, maxWidth: 320 }}>
                      Phoenixcoded has gained the trust of over 6.5K+ customers since 2015, thanks to our commitment to delivering
                      high-quality products. Our experienced team players are responsible for managing Able Pro.
                    </Typography>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={{ xs: 5, md: 2 }}>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Stack sx={{ gap: 3 }}>
                    <Typography variant="h5">Able Pro Eco-System</Typography>
                    <Stack sx={{ gap: { xs: 1.5, md: 2.5 } }}>
                      {EcoSystem.map((item, index) => (
                        <FooterLink key={index} href={item.link} target="_blank" underline="none">
                          {item.label}
                        </FooterLink>
                      ))}
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Stack sx={{ gap: 3 }}>
                    <Typography variant="h5">Help & Support</Typography>
                    <Stack sx={{ gap: { xs: 1.5, md: 2.5 } }}>
                      <FooterLink href="https://phoenixcoded.gitbook.io/able-pro" target="_blank" underline="none">
                        Documentation
                      </FooterLink>
                      <FooterLink href="https://codedthemes.support-hub.io/" target="_blank" underline="none">
                        Feature Request
                      </FooterLink>
                      <FooterLink href="https://phoenixcoded.gitbook.io/able-pro/v/react/roadmap/" target="_blank" underline="none">
                        RoadMap
                      </FooterLink>
                      <FooterLink href="https://codedthemes.support-hub.io/" target="_blank" underline="none">
                        Support
                      </FooterLink>
                      <FooterLink href="https://themeforest.net/user/phoenixcoded#contact" target="_blank" underline="none">
                        Email Us
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Stack sx={{ gap: 3 }}>
                    <Typography variant="h5">Useful Resources</Typography>
                    <Stack sx={{ gap: { xs: 1.5, md: 2.5 } }}>
                      <FooterLink href="https://codedthemes.com/privacy-policy/" target="_blank" underline="none">
                        Privacy Policy
                      </FooterLink>
                      <FooterLink href="https://codedthemes.com/license/" target="_blank" underline="none">
                        Licenses Term
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ py: 2.4, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'secondary.200' }}>
        <Container>
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Typography>© Handcrafted by Team Fast Track.</Typography>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, gap: 3 }}>
              <Tooltip title="Linkedin">
                <Link href="https://www.linkedin.com/company/phoenixcoded" underline="none" target="_blank" sx={linkSX}>
                  <LinkeDinIcon size={20} />
                </Link>
              </Tooltip>
              <Tooltip title="Facebook">
                <Link href="https://www.facebook.com/Phoenixcoded" underline="none" target="_blank" sx={linkSX}>
                  <Facebook size={20} variant="Bold" />
                </Link>
              </Tooltip>
              <Tooltip title="Youtube">
                <Link href="https://www.youtube.com/@phoenixcoded" underline="none" target="_blank" sx={linkSX}>
                  <Youtube variant="Bold" size={20} />
                </Link>
              </Tooltip>
              <Tooltip title="Github">
                <Link href="https://github.com/phoenixcoded" underline="none" target="_blank" sx={linkSX}>
                  <GithubFilledIcon size={20} />
                </Link>
              </Tooltip>
              <Tooltip title="Dribbble">
                <Link href="https://dribbble.com/Phoenixcoded" underline="none" target="_blank" sx={linkSX}>
                  <Dribbble variant="Bold" size={20} />
                </Link>
              </Tooltip>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
