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
import messaging from '@react-native-firebase/messaging';

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
    console.log('@Enter FcmExampleScreen!');

    await this.requestPermission();
    await this.createNotificationListeners();
  }

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
      // User has rejected permissions
      console.log('@FCM: permission rejected, ', error);
      if (error.message.includes('MISSING_INSTANCE_SERVICE')) {
        // This error means your device has no Google Play Services.
        Alert.alert(
          'Oops',
          'You are probably running this example within a simulator. You will need to install Google Play Service to using FCM.',
        );
      }
    }
  };

  createNotificationListeners = async () => {
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
  };

  onPressGetToken = async () => {
    // User has authorized
    const token = await messaging().getToken();
    this.setState({
      token,
    });
    Clipboard.setString(token);
    console.log('@FCM: Token=>', token);
  };

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
