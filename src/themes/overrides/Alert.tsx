// material-ui
import { PaletteColor, Theme } from '@mui/material/styles';
import { AlertProps } from '@mui/material/Alert';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

// project-imports
import getColors from 'utils/getColors';
import { withAlpha } from 'utils/colorUtils';

// types
import { ExtendedStyleProps } from 'types/extended';

const TaskAltOutlinedIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} fontSize="inherit">
    <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
  </SvgIcon>
);

// ==============================|| ALERT - COLORS ||============================== //

function getColorStyle({ color, theme }: ExtendedStyleProps) {
  const colors = getColors(theme, color);
  const { lighter, light, main, darker } = colors;

  return {
    borderColor: withAlpha(light, 0.5),
    backgroundColor: lighter,
    '& .MuiAlert-icon': {
      color: main,
      ...theme.applyStyles('dark', { color: darker })
    }
  };
}

// ==============================|| OVERRIDES - ALERT ||============================== //

export default function Alert(theme: Theme) {
  const { vars } = theme;
  const primaryDashed = getColorStyle({ color: 'primary', theme });

  const getPaletteColor = (severity: AlertProps['severity']) =>
    severity ? vars.palette[severity as keyof typeof vars.palette] : vars.palette.info;

  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          primary: <TaskAltOutlinedIcon />,
          secondary: <TaskAltOutlinedIcon />
        }
      },
      styleOverrides: {
        root: {
          padding: '10px 16px',
          alignItems: 'center',
          color: theme.vars.palette.text.primary,
          fontSize: '0.875rem',
          lineHeight: 1.5,
          '&:has(.MuiAlertTitle-root)': {
            alignItems: 'flex-start',
            '& .MuiAlert-icon': {
              paddingTop: 2,
              transform: 'none'
            }
          },
          variants: [
            {
              props: { variant: 'standard' },
              style: ({ ownerState }: { ownerState: AlertProps }) => {
                const paletteColor = getPaletteColor(ownerState.severity) as PaletteColor;

                return {
                  position: 'relative',
                  backgroundColor: withAlpha(paletteColor.main, 0.075),
                  color: theme.vars.palette.text.primary,
                  '& .MuiAlert-icon': { color: paletteColor.main }
                };
              }
            },
            {
              props: { variant: 'filled' },
              style: ({ ownerState }: { ownerState: AlertProps }) => {
                const paletteColor = getPaletteColor(ownerState.severity) as PaletteColor;

                return {
                  color: paletteColor.contrastText || theme.vars.palette.common.white,
                  backgroundColor: paletteColor.main,
                  '& .MuiAlert-icon': {
                    color: 'inherit'
                  }
                };
              }
            },
            {
              props: { variant: 'outlined' },
              style: ({ ownerState }: { ownerState: AlertProps }) => {
                const paletteColor = getPaletteColor(ownerState.severity) as PaletteColor;

                return {
                  borderColor: paletteColor.main,
                  color: theme.vars.palette.text.primary,
                  ...((ownerState.severity === 'primary' || ownerState.severity === 'secondary') && {
                    '& .MuiAlert-icon': { color: paletteColor.main }
                  })
                };
              }
            }
          ]
        },
        icon: {
          padding: 0,
          marginRight: 12,
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'center',
          opacity: 1,
          transform: 'translateY(-1px)',
          '& svg': {
            width: 20,
            height: 20,
            display: 'block'
          }
        },
        message: {
          padding: 0,
          marginTop: 0,
          flexGrow: 1,
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          lineHeight: 1.45
        },
        border: {
          padding: '10px 16px',
          border: '1px solid',
          ...primaryDashed,
          '&.MuiAlert-borderPrimary': getColorStyle({ color: 'primary', theme }),
          '&.MuiAlert-borderSecondary': getColorStyle({ color: 'secondary', theme }),
          '&.MuiAlert-borderError': getColorStyle({ color: 'error', theme }),
          '&.MuiAlert-borderSuccess': getColorStyle({ color: 'success', theme }),
          '&.MuiAlert-borderInfo': getColorStyle({ color: 'info', theme }),
          '&.MuiAlert-borderWarning': getColorStyle({ color: 'warning', theme })
        },
        action: {
          padding: 0,
          marginLeft: 'auto',
          paddingLeft: 16,
          marginRight: -4,
          alignItems: 'center',
          alignSelf: 'center',
          display: 'flex',
          '& .MuiButton-root': {
            padding: '2px 8px',
            height: 'auto',
            fontSize: '0.75rem',
            marginTop: 0
          },
          '& .MuiIconButton-root': {
            width: 28,
            height: 28,
            padding: 0,
            marginRight: 0,
            color: 'inherit',
            borderRadius: '50%',
            transition: theme.transitions.create(['background-color', 'opacity'], {
              duration: theme.transitions.duration.shorter
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.18)'
            },
            '& .MuiSvgIcon-root': {
              fontSize: '1rem'
            }
          }
        }
      }
    }
  };
}
