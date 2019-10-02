import { StyleSheet } from 'react-native';
import Colors from 'App/Theme/Colors';
import Styles from 'App/Theme/Styles';
import Fonts from 'App/Theme/Fonts';

export default StyleSheet.create({
  container: {
    ...Styles.screen.container,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Fonts.style.h2,
    textAlign: 'center',
    marginBottom: 5,
    color: Colors.text,
  },
  greeting: {
    ...Fonts.style.h4,
    textAlign: 'center',
    marginBottom: 15,
    color: Colors.primary,
  },
  description: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
    color: Colors.text,
    fontStyle: 'italic',
  },
  text: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
    color: Colors.text,
  },
  btnContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  separator: {
    marginVertical: 8,
    borderStyle: 'solid',
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
