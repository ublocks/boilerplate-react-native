import { boilerplateVersion } from '../../../package.json';

/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  boilerplateVersion,
  currentOrientation: '',
  currentState: 'active',
  currentTimeZone: 'Asia/Taipei',
  currentNetworkInfo: {
    details: {
      subnet: '',
      ipAddress: '',
      strength: 0,
      ssid: '',
      isConnectionExpensive: null,
    },
    isInternetReachable: null,
    isConnected: null,
    type: '',
  },
  currentDevice: {
    isTablet: null,
    isEmulator: null,
  },
  currentVersion: {},
  currentLocales: [],

  isLoading: false,
  loadingMessage: '',
  loadingOptions: {},

  isSystemAlertShow: false,
};
