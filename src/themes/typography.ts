// material-ui
import { TypographyVariantsOptions } from '@mui/material/styles';

// types
import { FontFamily } from 'types/config';

// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

export default function Typography(fontFamily: FontFamily): TypographyVariantsOptions {
  // Robust font stack fallback to prevent Cumulative Layout Shift (CLS)
  const fontStack = `${fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;

  return {
    htmlFontSize: 16,
    fontFamily: fontStack,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.25,
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
        lineHeight: 1.3
      }
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.875rem',
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
        lineHeight: 1.35
      }
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.33,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
        lineHeight: 1.4
      }
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5
    },
    h6: {
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.57
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.57
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.66
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1.66,
      textTransform: 'uppercase',
      letterSpacing: '0.8px'
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      textTransform: 'none'
    }
  };
}
