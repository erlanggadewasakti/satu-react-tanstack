// types
import { ConfigStates } from 'types/config';

// ==============================|| THEME CONSTANT ||============================== //

export const APP_DEFAULT_PATH = '/sample-page';
export const HORIZONTAL_MAX_ITEM = 8;
export const DRAWER_WIDTH = 280;
export const MINI_DRAWER_WIDTH = 90;
export const HEADER_HEIGHT = 74;
export const GRID_COMMON_SPACING = { xs: 2, md: 2.5 };
export const CSS_VAR_PREFIX = '';

export enum SimpleLayoutType {
  SIMPLE = 'simple',
  LANDING = 'landing'
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

export enum MenuOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  MINI_VERTICAL = 'mini-vertical'
}

export enum ThemeDirection {
  LTR = 'ltr',
  RTL = 'rtl'
}

export enum NavActionType {
  FUNCTION = 'function',
  LINK = 'link'
}

export enum AuthProvider {
  JWT = 'jwt',
  FIREBASE = 'firebase',
  AUTH0 = 'auth0',
  AWS = 'aws',
  SUPABASE = 'supabase'
}

export const APP_AUTH: AuthProvider = AuthProvider.JWT;
export const DEFAULT_THEME_MODE: ThemeMode = ThemeMode.LIGHT;

// ==============================|| THEME CONFIG ||============================== //

const config: ConfigStates = {
  fontFamily: `'Poppins', sans-serif`,
  i18n: 'en',
  menuOrientation: MenuOrientation.VERTICAL,
  menuCaption: true,
  container: false,
  presetColor: 'default',
  themeDirection: ThemeDirection.LTR,
  themeContrast: false
};

export default config;
