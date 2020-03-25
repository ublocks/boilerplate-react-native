import { isEqual, isError, attempt } from 'lodash';

export const shouldUpdate = (nextProps, nextState) => {
  const { sceneKey, routeName } = this.props;
  return (
    routeName === sceneKey &&
    (!isEqual(this.props, nextProps) || !isEqual(this.state, nextState))
  );
};

export const isJSON = (str) => {
  return !isError(attempt(JSON.parse, str));
};

export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
