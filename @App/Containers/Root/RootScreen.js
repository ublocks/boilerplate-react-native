import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { translate as t } from 'App/Helpers/I18n';
import styles from './RootScreenStyle';
import StartupActions from 'App/Stores/Startup/Actions';

const Separator = () => {
  return <View style={styles.separator} />;
};

class RootScreen extends React.Component {
  componentDidMount() {
    __DEV__ && console.log('@Enter RootScreen!');
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
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>{t('root_hello_world')}</Text>
          <Text style={styles.greeting}>{t('root_greeting')}</Text>
          <Text style={styles.text}>{t('root_description')}</Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            style={styles.button}
            onPress={this.onPressOpenApiExample}
            title={t('btnOpenApiExample')}
          />
          <Separator />
          <Button
            style={styles.button}
            onPress={this.onPressOpenFcmExample}
            title={t('btnOpenFcmExample')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  (state) => ({
    isLoading: state.appState.isLoading,
  }),
  (dispatch) => ({
    startup: () => dispatch(StartupActions.startup()),
  }),
)(RootScreen);
