import {Platform} from 'react-native';

export const default_font_family_Roboto =
  Platform.OS == 'android' ? 'Roboto' : 'system font';
export const APP_FONT = 'Roboto';
export const SERVER_API_FAILURE_MSG = 'Please try later. Server is busy.';
export const TIMEOUT_ERROR = 'Request Timeout';
