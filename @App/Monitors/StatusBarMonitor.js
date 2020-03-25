import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, StatusBar, View } from 'react-native';

import { Colors } from 'App/Theme';

class StatusBarMonitor extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    alertComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    routeName: PropTypes.string.isRequired,
    routeParams: PropTypes.object,
  };

  static defaultProps = {
    routeParams: {},
  };

  render() {
    console.log('this.props.routeParams=>', this.props.routeParams);
    const {
      children,
      alertComponent,
      routeParams: {
        topBarColor = Colors.white,
        bottomBarColor = Colors.white,
        statusBarStyle = 'dark-content',
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

        {alertComponent({ statusBarStyle })}
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
