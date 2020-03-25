import { StyleSheet } from 'react-native';
import { Colors, Styles } from 'App/Theme';

export default StyleSheet.create({
  container: {
    ...Styles.screen.container,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    display: 'flex',
    height: 70,
    justifyContent: 'center',
    width: 70,
  },
});
