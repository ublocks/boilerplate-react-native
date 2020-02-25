import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RNLocalize from 'react-native-localize';
import NetInfo from '@react-native-community/netinfo';
import VersionNumber from 'react-native-version-number';
import Orientation from 'react-native-orientation-locker';
// eslint-disable-next-line react-native/split-platform-components
import { Alert, AppState, BackHandler, Platform, ToastAndroid } from 'react-native';
import { setI18nConfig } from 'App/Helpers/I18n';
import { translate as t } from 'App/Helpers/I18n';
import { AppStateActions } from 'App/Stores';

export const EVENTS = {
  CHANGE: 'change',
  HARDWARE_BACK_PRESS: 'hardwareBackPress',
};

class AndroidBackKeyMonitor extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  /**
   * Register your event listeners when the app is mounted
   */
  componentDidMount() {
    // Android "Back" button trigger event listener
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        EVENTS.HARDWARE_BACK_PRESS,
        this.onAndroidBackButtonPressed,
      );
    }
  }

  /**
   * You must unregister listeners when your component unmount
   */
  componentWillUnmount() {
    // Android "Back" button trigger event listener
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener(
        EVENTS.HARDWARE_BACK_PRESS,
        this.onAndroidBackButtonPressed,
      );
    }
  }

  onAndroidBackButtonPressed = () => {
    __DEV__ && ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return false;
  };

  render() {
    const { children } = this.props;
    return children;
  }
}

export default AndroidBackKeyMonitor;
