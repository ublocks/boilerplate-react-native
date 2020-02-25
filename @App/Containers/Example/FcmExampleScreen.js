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
import firebase from 'react-native-firebase';
import { Permissions } from 'react-native-unimodules';

import { getCircularReplacer } from 'App/Helpers';
import style from './FcmExampleScreenStyle';

/**
 * This is an example of how to interact with FCM(Firebase Cloud Messaging).
 *
 * This screen displays the unique device fcm token,
 * you can copy and test via push service providers such as
 * AWS SNS, Firebase. The screen will automatically show up the received push message.
 */

class FcmExampleScreen extends React.Component {
  channelId = 'test-channel';

  channelName = 'Test channel';

  state = {
    permission: null,
    state: '',
    message: '',
    token: 'no token yet',
  };

  // Setup FCM permission and listeners when the scene is mounted
  async componentDidMount() {
    __DEV__ && console.log('@Mount FcmExampleScreen!');

    this.handleNotificationChannel();
    this.handleNotificationListeners();
    await this.handleRequestPermission();
  }

  handleNotificationChannel = () => {
    // Build a channel
    const channel = new firebase.notifications.Android.Channel(
      this.channelId,
      this.channelName,
      firebase.notifications.Android.Importance.Max,
    ).setDescription('My apps test channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);
  };

  handleNotificationListeners = async () => {
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(this.onMessageReceiveListener);

    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(this.onMessageReceiveListener);

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) =>
        this.onMessageReceiveListener(notificationOpen.notification),
      );

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      // const action = notificationOpen.action;
      // console.log('action=>', action);
      // body and title lost if accessed this way, taking info from data object where info will persist
      const notification = notificationOpen.notification;
      console.log('Initial ', notification);
      // Alert.alert(notification.data.title, notification.data.body);

      this.onMessageReceiveListener(notification);
    }
  };

  handleRequestPermission = async () => {
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

  onMessageReceiveListener = (message) => {
    console.log('onMessageReceiveListener=>', message);
    console.log('onMessageReceiveListener _data=>', message._data);
    console.log('onMessageReceiveListener _data.default=>', message._data.default);
    console.log(typeof message._data.default);

    this.setState({
      message,
    });
    if (typeof message._data.default === 'string') {
      const { title, body } = JSON.parse(message._data.default);

      // const notification = new firebase.notifications.Notification({
      //   show_in_foreground: true,
      // })
      //   .setNotificationId(message._messageId)
      //   .setTitle(`${title}`)
      //   .setBody(`${body}`);

      // if (Platform.OS === 'android') {
      //   notification.android
      //     .setAutoCancel(true)
      //     .android.setChannelId(this.channelId)
      //     .android.setPriority(firebase.notifications.Android.Priority.High)
      //     .android.setVibrate(500);
      // }

      // firebase
      //   .notifications()
      //   .displayNotification(notification)
      //   .catch((err) => Alert.alert(err.message, JSON.stringify(err, null, 2)));
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

  render() {
    const { message, token, permission } = this.state;
    return (
      <View style={style.container}>
        <ScrollView>
          <Image
            style={style.image}
            source={{
              uri: 'https://i.ytimg.com/vi/sioEY4tWmLI/maxresdefault.jpg',
            }}
            resizeMode={'contain'}
          />
          <Text style={style.title}>FCM Example</Text>
          <Text style={style.content}>
            This example will shows push notifications message when it arrives.
          </Text>

          {Platform.OS === 'ios' && (
            <>
              <Text style={style.title}>Permission Status</Text>
              <Text style={style.content}>{JSON.stringify(permission)}</Text>
            </>
          )}

          <Text style={style.title}>Device Token</Text>
          <Text style={style.content}>{token}</Text>

          <Text style={style.title}>Receive Message</Text>
          <Text style={style.message}>
            {JSON.stringify(message, getCircularReplacer(), 2)}
          </Text>

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
