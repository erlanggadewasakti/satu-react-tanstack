import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

// assets
import telkomLogo from 'assets/images/auth/telkom-logo.svg';
import satuLogo from 'assets/images/logo-satu.svg';

// ==============================|| AUTH - SIDE BANNER WITH ANIMATED BOKEH ||============================== //

const bokehSpans = [
  { top: '72%', left: '88%', duration: '43s', delay: '-17s', origin: '-16vw -15vh', color: '#b82828' },
  { top: '35%', left: '54%', duration: '45s', delay: '-21s', origin: '0vw 11vh', color: '#e92020' },
  { top: '41%', left: '86%', duration: '48s', delay: '-11s', origin: '-10vw 23vh', color: '#9f3f3f' },
  { top: '31%', left: '82%', duration: '35s', delay: '-4s', origin: '-9vw -21vh', color: '#9f3f3f' },
  { top: '91%', left: '34%', duration: '25s', delay: '-6s', origin: '20vw 15vh', color: '#9f3f3f' },
  { top: '7%', left: '24%', duration: '34s', delay: '-43s', origin: '-16vw 11vh', color: '#c43232' },
  { top: '47%', left: '50%', duration: '17s', delay: '-2s', origin: '-24vw -12vh', color: '#e92020' },
  { top: '48%', left: '38%', duration: '36s', delay: '-48s', origin: '-21vw 25vh', color: '#9f3f3f' },
  { top: '50%', left: '56%', duration: '23s', delay: '-26s', origin: '-2vw 14vh', color: '#c43232' },
  { top: '41%', left: '56%', duration: '35s', delay: '-32s', origin: '-11vw 12vh', color: '#9f3f3f' }
];

export default function AuthSideBanner() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        bgcolor: '#171717',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: { xs: 4, md: 6, lg: 8 },
        '@keyframes move': {
          to: {
            transform: 'translateZ(1px) rotate(1turn)'
          }
        }
      }}
    >
      {/* ANIMATED BOKEH CIRCLES */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          '& span': {
            width: '20vmin',
            height: '20vmin',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            boxShadow: '15vmin 0 10vmin currentColor',
            filter: 'blur(20px)',
            animation: 'move linear infinite'
          }
        }}
      >
        {bokehSpans.map((b, i) => (
          <Box
            component="span"
            key={i}
            sx={{
              top: b.top,
              left: b.left,
              animationDuration: b.duration,
              animationDelay: b.delay,
              transformOrigin: b.origin,
              color: b.color
            }}
          />
        ))}
      </Box>

      {/* TOP: TELKOM UNIVERSITY LOGO */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
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
      <Box sx={{ position: 'relative', zIndex: 2, my: 'auto', py: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: 'common.white',
            fontWeight: 400,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
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
            fontWeight: 800,
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
            maxWidth: 460,
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.6,
            fontWeight: 300
          }}
        >
          <FormattedMessage id="login.lens-desc" />
        </Typography>
      </Box>

      {/* BOTTOM: POWERED BY SATU FRAMEWORK */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.65)',
              fontWeight: 500,
              letterSpacing: 0.5,
              textTransform: 'uppercase'
            }}
          >
            <FormattedMessage id="login.powered-by" /> :
          </Typography>
          <Box
            component="img"
            src={satuLogo}
            alt="SATU Framework"
            sx={{
              height: 22,
              filter: 'brightness(0) invert(1)',
              opacity: 0.85
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}
