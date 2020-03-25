import ApiConst from './ApiConst';
import ApiRuntime from './ApiRuntime';
import * as ApiHook from './ApiHooks';

const ApiHandler = (method = ApiConst.GET, options) => async (url) => {
  const TIME_TAG = `${
    ApiConst.TAG
  }[${method.toUpperCase()}][${url}](${new Date().getTime()})`;
  if (__DEV__) {
    // console.group(TIME_TAG);
    console.time(TIME_TAG);
  }
  const result = await ApiRuntime({
    url,
    method,
    options,
  });
  if (__DEV__) {
    console.timeEnd(TIME_TAG);
    // console.groupEnd();
  }
  return result;
};

export default ApiHandler;
