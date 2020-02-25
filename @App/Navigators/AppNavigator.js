import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoadingIndicator } from '@ublocks-react-native/component';
import { Actions, Router, Reducer } from 'react-native-router-flux';

import { AppMonitor, NetInfoMonitor, AndroidBackKeyMonitor } from 'App/Monitors';
import { AppStateActions } from 'App/Stores';
import AppScenes from './AppScenes';

class AppNavigator extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    onLoading: PropTypes.func.isRequired,
    loadingMessage: PropTypes.string,
    loadingOptions: PropTypes.object,
  };

  static defaultProps = {
    loadingMessage: '',
    loadingOptions: {},
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
    const { onLoading, isLoading, loadingMessage, loadingOptions } = this.props;
    const { scenes } = this.state;
    return (
      <AppMonitor>
        <NetInfoMonitor>
          <AndroidBackKeyMonitor>
            <Router scenes={scenes} createReducer={this.onReducerCreate} />
            <LoadingIndicator
              open={isLoading && !loadingOptions.hide}
              onLongPress={() => onLoading(!isLoading)}
              text={loadingMessage}
              countdown={__DEV__}
            />
          </AndroidBackKeyMonitor>
        </NetInfoMonitor>
      </AppMonitor>
    );
  }
}

export default connect(
  (state) => ({
    isLoading: state.appState.isLoading,
    loadingMessage: state.appState.loadingMessage,
    loadingOptions: state.appState.loadingOptions,
  }),
  (dispatch) => {
    const actions = bindActionCreators(
      {
        onLoading: AppStateActions.onLoading,
      },
      dispatch,
    );
    return { ...actions, dispatch };
  },
)(AppNavigator);
