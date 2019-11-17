import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LoadingIndicator } from '@ublocks-react-native/component';
import { Actions, Router, Reducer } from 'react-native-router-flux';

import AppMonitor from './AppMonitor';
import AppScenes from './AppScenes';

class AppNavigator extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      scenes: Actions.create(AppScenes()),
    };
  }

  onReducerCreate = (INITIAL_STATE) => {
    const defaultReducer = new Reducer(INITIAL_STATE);
    return (state, action) => {
      this.props.dispatch(action);
      return defaultReducer(state, action);
    };
  };

  render() {
    const { isLoading } = this.props;
    const { scenes } = this.state;
    return (
      <AppMonitor>
        <>
          <Router scenes={scenes} createReducer={this.onReducerCreate} />
          <LoadingIndicator open={isLoading} />
        </>
      </AppMonitor>
    );
  }
}

export default connect(
  (state) => ({
    isLoading: state.appState.isLoading,
  }),
  (dispatch) => ({
    dispatch,
  }),
)(AppNavigator);
