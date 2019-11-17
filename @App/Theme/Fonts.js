import { Screen } from 'App/Helpers';

const size = {
  h1: Screen.scale(38),
  h2: Screen.scale(34),
  h3: Screen.scale(30),
  h4: Screen.scale(26),
  input: Screen.scale(18),
  regular: Screen.scale(16),
  medium: Screen.scale(14),
  small: Screen.scale(12),
};

const style = {
  h1: {
    fontSize: size.h1,
  },
  h2: {
    fontSize: size.h2,
  },
  h3: {
    fontSize: size.h3,
  },
  h4: {
    fontSize: size.h4,
  },
  regular: {
    fontSize: size.regular,
    fontWeight: '500',
  },
  medium: {
    fontSize: size.medium,
  },
  small: {
    fontSize: size.small,
  },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  underline: { textDecorationLine: 'underline' },
};

export default {
  size,
  style,
};
