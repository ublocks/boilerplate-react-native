import React from 'react';
import { Alert, Platform, Text, View, Image, Clipboard, Button } from 'react-native';
import { connect } from 'react-redux';
import Style from './FcmExampleScreenStyle';

import messaging from '@react-native-firebase/messaging';

// WORKAROUND for iOS permissions issue
// ref: https://github.com/invertase/react-native-firebase/issues/2657
import PushNotificationIOS from '@react-native-community/push-notification-ios';

/**
 * This is an example of how to interact with FCM(Firebase Cloud Messaging).
 *
 * This screen displays the unique device fcm token,
 * you can copy and test via push service providers such as
 * AWS SNS, Firebase. The screen will automatically show up the received push message.
 */

class FcmExampleScreen extends React.Component {
  state = {
    message: '',
    token: '',
  };

  // Setup FCM permission and listeners when the scene is mounted
  async componentDidMount() {
    console.log('@Enter FcmExampleScreen!');

    await this.requestPermission();
    await this.createNotificationListeners();
  }

  // Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    // this.notificationListener();
    // this.notificationOpenedListener();
  }

  async requestPermission() {
    try {
      // Check if app has push-notification permission
      // const enabled = await messaging().hasPermission();
      const enabled = await PushNotificationIOS.checkPermissions();
      if (!enabled) {
        // WORKAROUND for iOS permissions issue
        // ref: https://github.com/invertase/react-native-firebase/issues/2657
        await PushNotificationIOS.requestPermissions();
        // await messaging().requestPermission();
      }

      // User has authorized
      const token = await messaging().getToken();
      this.setState({ token });
      console.log('@FCM: Token=>', token);
    } catch (error) {
      // User has rejected permissions
      console.log('@FCM: permission rejected, ', error);
      if (error.message.includes('MISSING_INSTANCEID_SERVICE')) {
        // This error means your device has no Google Play Services.
        Alert.alert(
          'Oops',
          'You are probably running this example within a simulator. You will need to install Google Play Service to using FCM.',
        );
      }
    }
  }

  async createNotificationListeners() {
    // /*
    //  * Triggered when a particular notification has been received in foreground
    //  * */
    // this.notificationListener = firebase
    //   .notifications()
    //   .onNotification((notification) => {
    //     const { title, body } = notification;
    //     this.showAlert(title, body);
    //   });

    // /*
    //  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    //  * */
    // this.notificationOpenedListener = firebase
    //   .notifications()
    //   .onNotificationOpened((notificationOpen) => {
    //     const { title, body } = notificationOpen.notification;
    //     this.showAlert(title, body);
    //   });

    // /*
    //  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    //  * */
    // const notificationOpen = await firebase.notifications().getInitialNotification();
    // if (notificationOpen) {
    //   const { title, body } = notificationOpen.notification;
    //   this.showAlert(title, body);
    // }

    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));

      this.setState({
        message,
      });
    });
  }

  showAlert(title, body) {
    Alert.alert(title, body, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], {
      cancelable: false,
    });
  }

  render() {
    const { message, token } = this.state;
    return (
      <View style={Style.container}>
        <View style={Style.logoContainer}>
          <Image
            style={Style.logo}
            source={{
              uri:
                'https://firebase.google.com/docs/cloud-messaging/images/messaging-overview.png',
            }}
            resizeMode={'contain'}
          />
        </View>
        <Text style={Style.title}>Firebase Cloud Messaging Example</Text>
        <Text style={Style.instructions}>
          This example will shows push notifications message when it arrives.
        </Text>
        <Text style={Style.result}>
          {JSON.stringify(message || 'no message arrives')}
        </Text>
        <Button onPress={() => Clipboard.setString(token)} title="Copy FCM Token" />
      </View>
    );
  }
}

FcmExampleScreen.propTypes = {};

export default connect(
  (state) => ({}),
  (dispatch) => ({}),
)(FcmExampleScreen);
