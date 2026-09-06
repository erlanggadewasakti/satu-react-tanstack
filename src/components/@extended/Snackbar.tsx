import { SyntheticEvent } from 'react';

// material-ui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import Slide, { SlideProps } from '@mui/material/Slide';
import MuiSnackbar from '@mui/material/Snackbar';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

// project-imports
import { closeSnackbar, useGetSnackbar } from 'api/snackbar';

// types
import { KeyedObject } from 'types/root';

// animation function
function TransitionSlideLeft(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
  return <Grow {...props} />;
}

// animation options
const animation: KeyedObject = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade
};

// ==============================|| CLOSE ICON ||============================== //

function CloseIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24" fontSize="inherit" sx={{ width: 16, height: 16, display: 'block', ...props.sx }}>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </SvgIcon>
  );
}

// ==============================|| SNACKBAR ||============================== //

const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  closeSnackbar();
};

export default function Snackbar() {
  const { snackbar } = useGetSnackbar();

  return (
    <>
      {/* default snackbar */}
      {snackbar?.variant === 'default' && (
        <MuiSnackbar
          anchorOrigin={snackbar.anchorOrigin}
          open={snackbar.open}
          autoHideDuration={snackbar.autoHideDuration ?? 4000}
          onClose={handleClose}
          message={snackbar.message}
          slots={{ transition: animation[snackbar.transition || 'Fade'] }}
          slotProps={{
            content: {
              sx: {
                bgcolor: 'secondary.darker',
                color: 'common.white',
                typography: 'body2',
                fontWeight: 500,
                borderRadius: 2.5,
                boxShadow: (theme) => theme.customShadows?.z1 || '0px 8px 24px rgba(0, 0, 0, 0.15)',
                minWidth: { xs: 280, sm: 320 },
                maxWidth: { xs: '92vw', sm: 520 },
                px: 2,
                py: 1.25
              }
            }
          }}
          action={
            <>
              {snackbar.actionButton && (
                <Button
                  size="small"
                  onClick={handleClose}
                  sx={{
                    color: 'primary.light',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    mr: 0.5,
                    px: 1,
                    minWidth: 'auto',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                  }}
                >
                  UNDO
                </Button>
              )}
              {snackbar.close && (
                <IconButton
                  size="small"
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    color: 'common.white',
                    width: 28,
                    height: 28,
                    p: 0,
                    borderRadius: '50%',
                    opacity: 0.85,
                    transition: 'all 0.2s',
                    '&:hover': { opacity: 1, bgcolor: 'rgba(255, 255, 255, 0.15)' }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </>
          }
        />
      )}
      {/* alert snackbar */}
      {snackbar?.variant === 'alert' && (
        <MuiSnackbar
          slots={{ transition: animation[snackbar.transition || 'Fade'] }}
          anchorOrigin={snackbar.anchorOrigin}
          open={snackbar.open}
          autoHideDuration={snackbar.autoHideDuration ?? 4000}
          onClose={handleClose}
        >
          <Alert
            variant={snackbar.alert?.variant || 'filled'}
            severity={snackbar.severity}
            color={snackbar.alert?.color}
            action={
              <>
                {snackbar.actionButton && (
                  <Button
                    color="inherit"
                    size="small"
                    onClick={handleClose}
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      mr: 0.5,
                      px: 1,
                      minWidth: 'auto',
                      opacity: 0.9,
                      '&:hover': { opacity: 1, bgcolor: 'rgba(255, 255, 255, 0.15)' }
                    }}
                  >
                    UNDO
                  </Button>
                )}
                {snackbar.close && (
                  <IconButton
                    size="small"
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      color: 'inherit',
                      width: 28,
                      height: 28,
                      p: 0,
                      borderRadius: '50%',
                      opacity: 0.85,
                      transition: 'all 0.2s',
                      '&:hover': {
                        opacity: 1,
                        bgcolor:
                          snackbar.alert?.variant === 'standard' || snackbar.alert?.variant === 'outlined'
                            ? 'action.hover'
                            : 'rgba(255, 255, 255, 0.2)'
                      }
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </>
            }
            sx={{
              minWidth: { xs: 280, sm: 320 },
              maxWidth: { xs: '92vw', sm: 520 },
              borderRadius: 2.5,
              fontWeight: 500,
              boxShadow: (theme) => theme.customShadows?.z1 || '0px 8px 24px rgba(0, 0, 0, 0.15)',
              ...snackbar.alert?.sx,
              ...(snackbar.alert?.variant === 'outlined' && { bgcolor: 'background.paper' })
            }}
          >
            {snackbar.message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
}
