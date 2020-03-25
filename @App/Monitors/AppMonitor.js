import React from 'react';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
import VersionNumber from 'react-native-version-number';
import Orientation from 'react-native-orientation-locker';
import * as RNLocalize from 'react-native-localize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppState } from 'react-native';

import { setI18nConfig } from 'App/Helpers/I18n';
import AppStateActions from 'App/Stores/AppState/Actions';

const EVENTS = {
  CHANGE: 'change',
};

// kick off i18n env.
setI18nConfig();

class AppMonitor extends React.Component {
  static propTypes = {
    handleAppStateUpdate: PropTypes.func.isRequired,
    handleAppDeviceUpdate: PropTypes.func.isRequired,
    handleAppLocaleUpdate: PropTypes.func.isRequired,
    handleAppVersionUpdate: PropTypes.func.isRequired,
    handleAppOrientationUpdate: PropTypes.func.isRequired,
  };

  /**
   * Register your event listeners when the app is mounted
   */
  async componentDidMount() {
    // Update app version when starts
    const { handleAppVersionUpdate, handleAppDeviceUpdate } = this.props;

    // Get current package version
    handleAppVersionUpdate(VersionNumber);

    // Get current device information
    handleAppDeviceUpdate({
      isTablet: DeviceInfo.isTablet(),
      isEmulator: await DeviceInfo.isEmulator(),
      systemVersion: DeviceInfo.getSystemVersion(),
      deviceId: DeviceInfo.getDeviceId(),
      deviceName: await DeviceInfo.getDeviceName(),
      totalMemoryInMb: (await DeviceInfo.getTotalMemory()) / 1024 / 1024,
      // isTablet: DeviceInfo.isTablet(),
      // isTablet: DeviceInfo.isTablet(),
    });

    // kick off the state updates
    this.onAppStateChange();
    this.onLocalizationChange();

    // AppState change event listener
    AppState.addEventListener(EVENTS.CHANGE, this.onAppStateChange);

    // Locale change event listener
    RNLocalize.addEventListener(EVENTS.CHANGE, this.onLocalizationChange);

    // Orientation change event listener
    Orientation.addOrientationListener(this.onOrientationChange);
  }

  /**
   * You must unregister listeners when your component unmount
   */
  componentWillUnmount() {
    // AppState change event listener
    AppState.removeEventListener(EVENTS.CHANGE, this.onAppStateChange);

    // Locale change event listener
    RNLocalize.removeEventListener(EVENTS.CHANGE, this.onLocalizationChange);

    // Orientation change event listener
    Orientation.removeOrientationListener(this.onOrientationChange);
  }

  /**
   * Handle app orientation changes
   * @see https://github.com/wonday/react-native-orientation-locker
   * @memberof AppMonitor
   */
  onOrientationChange = (orientation) => {
    __DEV__ && console.log('@onAppOrientationChange: ', orientation);

    // update appState when changes
    const { handleAppOrientationUpdate } = this.props;
    handleAppOrientationUpdate(orientation);
  };

  /**
   * Handle app state changes
   * @see https://facebook.github.io/react-native/docs/appstate
   * @memberof AppMonitor
   */
  onAppStateChange = (nextAppState) => {
    __DEV__ && console.log('@onAppStateChange: ', nextAppState);

    // update appState when changes
    // this.setState({ currentState: nextAppState });
    const { handleAppStateUpdate } = this.props;
    handleAppStateUpdate(nextAppState);
  };

  /**
   * Handle app locale changes
   * @see https://github.com/react-native-community/react-native-localize
   * @memberof AppMonitor
   */
  onLocalizationChange = () => {
    const { handleAppLocaleUpdate } = this.props;
    handleAppLocaleUpdate({
      currentLocales: RNLocalize.getLocales(),
      currentTimeZone: RNLocalize.getTimeZone(),
    });

    // Update app locale
    setI18nConfig();

    // Force re-render
    this.forceUpdate();
  };

  render() {
    // return this.props.children;
    return null;
  }
}

export default connect(
  (state) => ({}),
  (dispatch) =>
    bindActionCreators(
      {
        handleAppStateUpdate: AppStateActions.onStateChange,
        handleAppDeviceUpdate: AppStateActions.onDeviceChange,
        handleAppLocaleUpdate: AppStateActions.onLocaleChange,
        handleAppVersionUpdate: AppStateActions.onVersionChange,
        handleAppOrientationUpdate: AppStateActions.onOrientationChange,
      },
      dispatch,
    ),
)(AppMonitor);
