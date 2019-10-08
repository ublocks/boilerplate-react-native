import { ScaledSheet } from 'App/Helpers';
import Fonts from 'App/Theme/Fonts';
import Styles from 'App/Theme/Styles';

export default ScaledSheet.create({
  container: {
    ...Styles.screen.container,
    margin: 30,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...Fonts.style.h4,
    textAlign: 'left',
    marginBottom: 10,
  },
  content: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,

    color: 'gray',
  },
  message: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: 'blue',
  },
  image: {
    width: '100%',
    height: '200@s',
    marginBottom: '15@vs',
  },
});
