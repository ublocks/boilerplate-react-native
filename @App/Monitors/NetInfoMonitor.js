import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NetInfo from '@react-native-community/netinfo';
import { AppStateActions } from 'App/Stores';

class NetInfoMonitor extends React.Component {
  removeNetInfoListener = null;

  static propTypes = {
    currentNetworkInfo: PropTypes.object.isRequired,
    handleAppNetInfoUpdate: PropTypes.func.isRequired,
  };

  /**
   * Register your event listeners when the app is mounted
   */
  componentDidMount() {
    // Subscribe Network info change event
    this.removeNetInfoListener = NetInfo.addEventListener(this.onNetInfoChange);
  }

  /**
   * You must unregister listeners when your component unmount
   */
  componentWillUnmount() {
    // Unsubscribe network info event listener
    this.removeNetInfoListener();
  }

  /**
   * Handle phone network status changes
   * @see https://github.com/react-native-community/react-native-netinfo
   * @memberof NetInfoMonitor
   */
  onNetInfoChange = (state) => {
    __DEV__ && console.log('@onNetInfoChange: ', state);

    // update netWorkState when changes
    const { handleAppNetInfoUpdate } = this.props;
    handleAppNetInfoUpdate(state);
  };

  render() {
    return null;
  }
}

export default connect(
  (state) => ({
    currentNetworkInfo: state.appState.currentNetworkInfo,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        handleAppNetInfoUpdate: AppStateActions.onNetInfoChange,
      },
      dispatch,
    ),
)(NetInfoMonitor);
