import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, StatusBar } from 'react-native';

import { Colors } from 'App/Theme';

class StatusBarMonitor extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    routeName: PropTypes.string.isRequired,
    routeParams: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  render() {
    const {
      children,
      routeParams: {
        topBarColor = Colors.white,
        bottomBarColor = Colors.white,
        statusBarStyle,
      } = {},
    } = this.props;
    const topBarColorStyle = {
      flex: 0,
      backgroundColor: topBarColor,
    };
    const bottomBarColorStyle = {
      flex: 1,
      backgroundColor: bottomBarColor,
    };
    return (
      <>
        <StatusBar
          backgroundColor={topBarColor || Colors.paleGrey}
          barStyle={statusBarStyle || 'dark-content'}
        />
        <SafeAreaView style={topBarColorStyle} />
        <SafeAreaView style={bottomBarColorStyle}>{children}</SafeAreaView>
      </>
    );
  }
}

export default connect(
  (state) => ({
    routeParams: state.appRoute.params,
    routeName: state.appRoute.routeName,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        dispatch,
      },
      dispatch,
    ),
)(StatusBarMonitor);
