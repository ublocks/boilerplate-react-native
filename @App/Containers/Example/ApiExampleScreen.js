import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import ExampleActions from 'App/Stores/Example/Actions';
import { liveInEurope } from 'App/Stores/Example/Selectors';
import Style from './ApiExampleScreenStyle';
import { Classes, Images, Fonts } from 'App/Theme';
import { translate as t } from 'App/Helpers/I18n';

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const instructions = Platform.select({
  ios: t('example_instructions_ios'),
  // 'Press Cmd+R to reload,\nCmd+D or shake for dev menu.',
  android: t('example_instructions_android'),
  // 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu.',
});

class ApiExampleScreen extends React.Component {
  static propTypes = {
    createPost: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    __DEV__ && console.log('@Mount ApiExampleScreen!');
  }

  render() {
    return (
      <View style={Style.container}>
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <View style={Style.logoContainer}>
              <Image style={Style.logo} source={Images.logo} resizeMode={'contain'} />
            </View>
            <Text style={Style.text}>{t('example_title')}</Text>
            <Text style={Style.instructions}>{instructions}</Text>
            {this.props.userErrorMessage ? (
              <Text style={Style.error}>{this.props.userErrorMessage}</Text>
            ) : (
              <View style={Classes.center}>
                <Text style={Fonts.style.regular}>
                  {t('example_username')
                  // "I'm a fake user, my name is "
                  }
                  {this.props.user.name}
                </Text>
                <Text style={Fonts.style.regular}>
                  {this.props.liveInEurope
                    ? t('example_live_in_eu') //'I live in Europe !'
                    : t('example_not_live_in_eu') // "I don't live in Europe."
                  }
                </Text>
              </View>
            )}
            <Button onPress={this.props.fetchUser} title={t('example_refresh')} />
            <Button onPress={this.props.createPost} title={t('example_create')} />
          </View>
        )}
      </View>
    );
  }
}

ApiExampleScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: liveInEurope(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
  createPost: () => dispatch(ExampleActions.createPost()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApiExampleScreen);
