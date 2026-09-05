import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

// assets
import telkomLogo from 'assets/images/auth/telkom-logo.svg';
import satuLogo from 'assets/images/logo-satu.svg';

// ==============================|| AUTH - BOKEH & SIDE BANNER ||============================== //

const bokehSpans = [
  {
    id: 'bokeh-1',
    top: '12%',
    left: '33%',
    size: '18vmin',
    duration: '14s',
    delay: '-1s',
    origin: '15vw -5vh',
    color: 'rgb(108, 117, 125)'
  },
  { id: 'bokeh-2', top: '40%', left: '50%', size: '22vmin', duration: '18s', delay: '-3s', origin: '5vw 10vh', color: 'rgb(106, 4, 23)' },
  { id: 'bokeh-3', top: '25%', left: '75%', size: '16vmin', duration: '22s', delay: '-4s', origin: '-20vw 15vh', color: 'rgb(38, 50, 56)' },
  {
    id: 'bokeh-4',
    top: '80%',
    left: '10%',
    size: '20vmin',
    duration: '26s',
    delay: '0s',
    origin: '10vw -15vh',
    color: 'rgb(108, 117, 125)'
  },
  { id: 'bokeh-5', top: '5%', left: '20%', size: '16vmin', duration: '12s', delay: '-2s', origin: '-10vw 5vh', color: 'rgb(106, 4, 23)' },
  { id: 'bokeh-6', top: '55%', left: '80%', size: '20vmin', duration: '19s', delay: '-5s', origin: '0vw 20vh', color: 'rgb(38, 50, 56)' },
  {
    id: 'bokeh-7',
    top: '70%',
    left: '30%',
    size: '22vmin',
    duration: '24s',
    delay: '-1s',
    origin: '20vw 10vh',
    color: 'rgb(108, 117, 125)'
  },
  { id: 'bokeh-8', top: '15%', left: '45%', size: '18vmin', duration: '28s', delay: '-3s', origin: '15vw -10vh', color: 'rgb(106, 4, 23)' },
  { id: 'bokeh-9', top: '60%', left: '70%', size: '16vmin', duration: '14s', delay: '-2s', origin: '-5vw 5vh', color: 'rgb(38, 50, 56)' },
  {
    id: 'bokeh-10',
    top: '35%',
    left: '55%',
    size: '20vmin',
    duration: '20s',
    delay: '-4s',
    origin: '10vw 20vh',
    color: 'rgb(108, 117, 125)'
  }
];

export function AuthBokehBackground() {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'block' },
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        '@keyframes move': {
          '0%': {
            transform: 'translateZ(1px) rotate(0deg)'
          },
          '100%': {
            transform: 'translateZ(1px) rotate(360deg)'
          }
        },
        '& span': {
          borderRadius: '50%',
          position: 'absolute',
          backfaceVisibility: 'hidden',
          filter: 'blur(25px)'
        }
      }}
    >
      {bokehSpans.map((b) => (
        <Box
          component="span"
          key={b.id}
          sx={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            animation: `${b.duration} linear ${b.delay} infinite move`,
            transformOrigin: b.origin,
            bgcolor: b.color,
            boxShadow: `0 0 40px 10px ${b.color}`
          }}
        />
      ))}
    </Box>
  );
}

export default function AuthSideBanner() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: { xs: 4, md: 6, lg: 8 }
      }}
    >
      {/* TOP: TELKOM UNIVERSITY LOGO */}
      <Box>
        <Box
          component="img"
          src={telkomLogo}
          alt="Telkom University"
          sx={{
            width: { xs: 80, md: 100 },
            height: 'auto',
            display: 'block'
          }}
        />
      </Box>

      {/* CENTER: LENS OBE HEADLINE */}
      <Box sx={{ my: 'auto', py: 4 }}>
        <Typography
          variant="h3"
          sx={{
            color: 'common.white',
            fontWeight: 400,
            letterSpacing: 0.5,
            mb: 0.5
          }}
        >
          <FormattedMessage id="login.welcome-to" />
        </Typography>

        <Typography
          variant="h1"
          sx={{
            color: 'common.white',
            fontWeight: 700,
            fontSize: { xs: '2.75rem', md: '3.75rem', lg: '4.5rem' },
            letterSpacing: -1,
            lineHeight: 1.1,
            mb: 2
          }}
        >
          LENS
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: 480,
            lineHeight: 1.6
          }}
        >
          <FormattedMessage id="login.lens-desc" />
        </Typography>
      </Box>

      {/* BOTTOM: FOOTER "POWERED BY: satu framework" */}
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5 }}>
        <Typography
          variant="overline"
          sx={{
            color: 'rgba(255, 255, 255, 0.6)'
          }}
        >
          <FormattedMessage id="login.powered-by" />
        </Typography>
        <Box
          component="img"
          src={satuLogo}
          alt="satu framework"
          sx={{
            height: 20,
            width: 'auto',
            opacity: 0.85
          }}
        />
      </Stack>
    </Box>
  );
}
