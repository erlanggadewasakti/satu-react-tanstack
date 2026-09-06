// material-ui
import { Theme } from '@mui/material/styles';

// project-imports
import { withAlpha } from 'utils/colorUtils';

// ==============================|| OVERRIDES - SNACKBAR ||============================== //

export default function Snackbar(theme: Theme) {
  return {
    MuiSnackbar: {
      styleOverrides: {
        root: {
          zIndex: 100000,
          '& .MuiAlert-root': {
            minWidth: 320,
            maxWidth: 520,
            borderRadius: 10,
            padding: '10px 16px',
            alignItems: 'center',
            boxShadow: theme.customShadows?.z1 || '0px 8px 24px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0, 0, 0, 0.08)',
            '& .MuiAlert-icon': {
              marginRight: 12,
              alignSelf: 'center',
              display: 'flex',
              alignItems: 'center',
              opacity: 1,
              transform: 'translateY(-1px)',
              '& svg': {
                width: 20,
                height: 20,
                display: 'block'
              }
            },
            '& .MuiAlert-message': {
              flexGrow: 1,
              padding: 0,
              margin: 0,
              fontSize: '0.875rem',
              fontWeight: 500,
              lineHeight: 1.45,
              display: 'flex',
              alignItems: 'center'
            },
            '& .MuiAlert-action': {
              padding: 0,
              marginLeft: 'auto',
              paddingLeft: 16,
              marginRight: -4,
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'center',
              '& .MuiButton-root': {
                marginRight: 8,
                marginTop: 0,
                fontWeight: 600,
                fontSize: '0.75rem'
              },
              '& .MuiIconButton-root': {
                width: 28,
                height: 28,
                padding: 0,
                color: 'inherit',
                borderRadius: '50%',
                transition: theme.transitions.create(['background-color', 'opacity'], {
                  duration: theme.transitions.duration.shorter
                }),
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }
              }
            },
            '&.MuiAlert-standard, &.MuiAlert-outlined': {
              boxShadow: theme.customShadows?.z1 || '0px 4px 16px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.05)',
              '& .MuiAlert-action .MuiIconButton-root': {
                color: theme.vars.palette.text.secondary,
                '&:hover': {
                  backgroundColor: withAlpha(theme.vars.palette.text.primary, 0.08),
                  color: theme.vars.palette.text.primary
                }
              }
            }
          }
        }
      }
    }
  };
}
