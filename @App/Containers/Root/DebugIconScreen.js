import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome5';

import { Classes } from 'App/Theme';
import { BaseButton, BaseIcon as Icon } from 'App/Components';
import styles from './DebugIconScreenStyle';

class DebugIconScreen extends React.PureComponent {
  static propTypes = {
    isPaired: PropTypes.bool.isRequired,
    isConnected: PropTypes.bool.isRequired,
    routeName: PropTypes.string.isRequired,
  };

  render() {
    const { routeName, isConnected, isPaired } = this.props;
    return (
      <BaseButton
        transparent
        style={styles.container}
        onPress={Actions.DEBUG}
        disabled={
          typeof routeName === 'string' && routeName.toLowerCase().includes('debug')
        }
      >
        <Icon size={12} name="bug" color={isConnected ? 'green' : 'darkred'} />
        {isPaired && (
          <Icon
            name="circle"
            size={24}
            color={isConnected ? 'green' : 'darkred'}
            style={Classes.absolute}
          />
        )}
      </BaseButton>
    );
  }
}

export default connect((state) => ({
  routeName: state.appRoute.routeName,
  isPaired: state.mirror.isPaired,
  isConnected: state.mirror.isConnected,
}))(DebugIconScreen);
