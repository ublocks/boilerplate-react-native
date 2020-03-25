import React from 'react';
import PropTypes from 'prop-types';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import { bindActionCreators } from 'redux';

import { Screen, ifIphoneX } from 'App/Helpers';
import { AppAlertActions } from 'App/Stores';

class DropdownAlertMonitor extends React.Component {
  static propTypes = {
    showAlert: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    getAlertRef: PropTypes.func,
    component: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    closeInterval: PropTypes.number,
    content: PropTypes.string,
    extraData: PropTypes.object,
    options: PropTypes.object,
    alertShowAt: PropTypes.number,
    inactiveStatusBarStyle: PropTypes.oneOf([
      'default',
      'light-content',
      'dark-content',
      undefined,
    ]),
  };

  static defaultProps = {
    getAlertRef: null,
    component: 'react-native-dropdownalert',
    status: 'hide',
    type: 'info',
    onClose: null,
    closeInterval: 6 * 1000,
    inactiveStatusBarStyle: 'dark-content',
  };

  dropdown = null;

  componentDidUpdate(prevProps) {
    const { component, status, type, title, content, alertShowAt } = this.props;
    // console.log('this.props=>', this.props);
    if (
      component === 'react-native-dropdownalert' &&
      status === 'show' &&
      prevProps.alertShowAt !== alertShowAt
    ) {
      if (type && title) {
        this.dropdown.alertWithType(type, title, content);
        __DEV__ && console.log('@DropdownAlertMonitor: fire alert!');
      }
    }
  }

  // all props:
  // https://github.com/testshallpass/react-native-dropdownalert/blob/master/docs/PROPS.md
  getConfig = (options = this.props) => {
    // console.log('this.props=>', this.props);
    return Object.assign(
      {
        replaceEnabled: true,
        defaultContainer: {
          padding: Screen.scale(16),
          // alert padding top
          paddingTop:
            Platform.OS === 'ios'
              ? ifIphoneX(Screen.verticalScale(40), Screen.verticalScale(20))
              : Screen.verticalScale(10),
          flexDirection: 'row',
        },
      },
      options,
    );
  };

  handleRef = (ref) => {
    this.dropdown = ref;
    const { getAlertRef } = this.props;
    if (typeof getAlertRef === 'function' && this.dropdown) {
      getAlertRef(ref);
    }
  };

  handleOnClose = async (data) => {
    const { onClose } = this.props;
    const { showAlert } = this.props;
    // showAlert({ status: 'hide' });

    if (typeof onClose === 'function') {
      await onClose(data);
    }
  };

  render() {
    return (
      <DropdownAlert
        {...this.getConfig(this.props)}
        onClose={this.handleOnClose}
        ref={this.handleRef}
        updateStatusBar
      />
    );
  }
}

export default connect(
  (state) => ({
    component: state.appAlert.component,
    status: state.appAlert.status,
    type: state.appAlert.type,
    title: state.appAlert.title,
    content: state.appAlert.content,
    closeInterval: state.appAlert.closeInterval,
    extraData: state.appAlert.extraData,
    options: state.appAlert.options,
    alertShowAt: state.appAlert.alertShowAt,
    onClose: state.appAlert.onClose,
    // history: state.appAlert.history,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        showAlert: AppAlertActions.onAlert,
      },
      dispatch,
    ),
)(DropdownAlertMonitor);
