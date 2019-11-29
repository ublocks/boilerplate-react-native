import React from 'react';
import {
  Clipboard,
  ScrollView,
  Platform,
  Alert,
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import { Permissions } from 'react-native-unimodules';
import { firebase } from '@react-native-firebase/messaging';
import { NotificationsAndroid } from 'react-native-notifications';

import Style from './FcmExampleScreenStyle';

/**
 * This is an example of how to interact with FCM(Firebase Cloud Messaging).
 *
 * This screen displays the unique device fcm token,
 * you can copy and test via push service providers such as
 * AWS SNS, Firebase. The screen will automatically show up the received push message.
 */

class FcmExampleScreen extends React.Component {
  state = {
    permission: null,
    message: '',
    token: 'no token yet',
  };

  // Setup FCM permission and listeners when the scene is mounted
  async componentDidMount() {
    __DEV__ && console.log('@Mount FcmExampleScreen!');

    this.createNotificationListeners();
    await this.requestPermission();
  }

  createNotificationListeners = () => {
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));

      this.setState({
        message,
      });
    });

    // On Android, we allow for only one (global) listener per each event type.
    NotificationsAndroid.setRegistrationTokenUpdateListener((deviceToken) => {
      // TODO: Send the token to my server so it could send back push notifications...
      console.log('Push-notifications registered!', deviceToken);
    });
    NotificationsAndroid.setNotificationReceivedListener((notification) => {
      console.log(
        'Notification received on device in background or foreground',
        notification.getData(),
      );
    });
    NotificationsAndroid.setNotificationReceivedInForegroundListener((notification) => {
      console.log(
        'Notification received on device in foreground',
        notification.getData(),
      );
    });
    NotificationsAndroid.setNotificationOpenedListener((notification) => {
      console.log('Notification opened by device user', notification.getData());
    });
  };

  requestPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        this.setState({
          permission: status,
        });
        if (status !== 'granted') {
          throw new Error('@FCM: Notification permission not granted.');
        }
      }
      await this.onPressGetToken();
    } catch (error) {
      // User has rejected permissions or other issues happened
      Alert.alert(
        '@FCM: permission rejected',
        `${error.message}\n\n${JSON.stringify(error, null, 2)}`,
      );
      if (error.message.includes('MISSING_INSTANCE_SERVICE')) {
        // This error means your device has no Google Play Services.
        Alert.alert(
          'Oops',
          'You are probably running this example within a simulator. You will need to install Google Play Service to using FCM.',
        );
      }
    }
  };

  onPressGetToken = async () => {
    // User has authorized
    const token = await firebase.messaging().getToken();
    this.setState({
      token,
    });
    Clipboard.setString(token);
    __DEV__ && console.log('@FCM: Token=>', token);
  };

  showAlert(title, body) {
    Alert.alert(title, body, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], {
      cancelable: false,
    });
  }

  render() {
    const { message, token, permission } = this.state;
    return (
      <View style={Style.container}>
        <ScrollView>
          <Image
            style={Style.image}
            source={{
              uri: 'https://i.ytimg.com/vi/sioEY4tWmLI/maxresdefault.jpg',
            }}
            resizeMode={'contain'}
          />
          <Text style={Style.title}>FCM Example</Text>
          <Text style={Style.content}>
            This example will shows push notifications message when it arrives.
          </Text>

          {Platform.OS === 'ios' && (
            <>
              <Text style={Style.title}>Permission Status</Text>
              <Text style={Style.content}>{JSON.stringify(permission)}</Text>
            </>
          )}

          <Text style={Style.title}>Device Token</Text>
          <Text style={Style.content}>{token}</Text>

          <Text style={Style.title}>Receive Message</Text>
          <Text style={Style.message}>{JSON.stringify(message)}</Text>

          <Button onPress={this.onPressGetToken} title="Copy FCM Token" />
        </ScrollView>
      </View>
    );
  }
}

FcmExampleScreen.propTypes = {};

export default connect(
  (state) => ({}),
  (dispatch) => ({}),
)(FcmExampleScreen);
