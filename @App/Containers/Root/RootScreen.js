import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { NavBar } from '@ublocks-react-native/component';
import { translate as t } from 'App/Helpers/I18n';

import styles from './RootScreenStyle';
import StartupActions from 'App/Stores/Startup/Actions';

const Separator = () => {
  return <View style={styles.separator} />;
};

class RootScreen extends React.Component {
  static propTypes = {
    appRoute: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    startup: PropTypes.func.isRequired,
  };

  componentDidMount() {
    __DEV__ && console.log('@Mount RootScreen!');
  }

  onPressOpenApiExample = () => {
    // Run the startup saga when the application is starting
    this.props.startup();
  };

  onPressOpenFcmExample = () => {
    // Run the startup saga when the application is starting
    Actions.FcmExampleScreen();
  };

  render() {
    const { appRoute } = this.props;
    return (
      <View style={styles.container}>
        {/* <NavBar
          appRoute={appRoute}
          title="App Title"
          style={styles.navBar}
          leftComponent={<Text style={styles.text}>{t('root_left')}</Text>}
          rightComponent={<Text style={styles.text}>{t('root_right')}</Text>}
          // statusbarStyle="dark-content"
        /> */}
        <View style={styles.bodyWrapper}>
          <Text style={styles.title}>{t('root_hello_world')}</Text>
          <Text style={styles.greeting}>{t('root_greeting')}</Text>
          <Text style={styles.text}>{t('root_description')}</Text>
          <Text style={styles.title}>{t('root_examples')}</Text>
          <View>
            <Button
              style={styles.button}
              onPress={this.onPressOpenApiExample}
              title={t('root_btnOpenApiExample')}
            />
            <Separator />
            <Button
              style={styles.button}
              onPress={this.onPressOpenFcmExample}
              title={t('root_btnOpenFcmExample')}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    appRoute: state.appRoute,
    isLoading: state.appState.isLoading,
  }),
  (dispatch) => ({
    startup: () => dispatch(StartupActions.startup()),
  }),
)(RootScreen);
