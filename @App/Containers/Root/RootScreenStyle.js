import { StyleSheet } from 'react-native';
import { ScaledSheet } from 'App/Helpers';
import { Classes, Colors, Styles, Fonts } from 'App/Theme';

export default ScaledSheet.create({
  container: {
    ...Styles.screen.container,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  navBar: {
    ...Classes.mainStart,
    ...Classes.crossStart,
    flex: 0.1,
  },
  bodyWrapper: {
    ...Styles.screen.container,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.9,
    marginLeft: '10@s',
  },
  title: {
    ...Fonts.style.h2,
    marginVertical: '15@vs',
    color: Colors.text,
  },
  greeting: {
    ...Fonts.style.h4,
    marginBottom: '15@vs',
    color: Colors.primary,
  },
  description: {
    ...Fonts.style.normal,
    marginBottom: '5@s',
    color: Colors.text,
    fontStyle: 'italic',
  },
  text: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: '5@s',
    color: Colors.text,
  },
  separator: {
    marginVertical: '10@s',
    borderStyle: 'solid',
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
