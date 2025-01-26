import { createTheme } from '@material-ui/core/styles';
import { whatsAppColors } from './colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: whatsAppColors.primary,
      dark: whatsAppColors.dark,
      light: whatsAppColors.light,
    },
    secondary: {
      main: whatsAppColors.secondary,
    },
    background: {
      default: whatsAppColors.background,
      paper: whatsAppColors.white,
    },
    text: {
      primary: whatsAppColors.textPrimary,
      secondary: whatsAppColors.textSecondary,
    },
  },
  typography: {
    fontFamily: 'Helvetica Neue, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
}); 