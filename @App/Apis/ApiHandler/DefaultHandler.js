import { throttle } from 'lodash';

import { Config } from 'App/Config';
import { translate as t } from 'App/Helpers/I18n';
import { AppStore, AppAlertActions } from 'App/Stores';

export const ThrottledAlert = throttle(({ title, content, type = 'error', buttons }) => {
  if (title.length > 0) {
    console.log('@ThrottledAlert: fire alert!');
    AppStore.dispatch(
      AppAlertActions.showAlert({
        status: 'show',
        title,
        content,
        type,
        ...buttons,
        // service: '',
        // actionSubject: '',
        // actionTime: ''
      }),
    );
  }
}, 1000);

export const DefaultSuccessHandler = (response) => {
  const { status } = response;
  __DEV__ && console.log('DefaultSuccessHandler response=>', response);

  switch (response.status) {
    case 200: {
      __DEV__ &&
        ThrottledAlert({
          title: t('_alert_api_default_success_title'),
          content: `${t('_alert_api_default_success_desc')} (200)`,
          button: [{ onPress: () => {} }],
          type: 'info',
        });
      break;
    }
  }
};

export const DefaultErrorHandler = (response) => {
  const { status } = response;
  __DEV__ && console.log('DefaultErrorHandler response=>', response);
  // __DEV__ &&
  //   Alert.alert(
  //     `API ERROR: ${status}:`,
  //     `[Url]: ${response.config.url}\n\n[Response]: ${JSON.stringify(response, null, 2)}`,
  //   );
  __DEV__ &&
    console.warn(
      `${status}:
      \n \n[Url]: ${response.config.url}`,
      JSON.stringify(response, null, 2),
    );

  switch (response.status) {
    case 400: {
      ThrottledAlert({
        type: 'warning',
        title: t('_api_warring_title'),
        content: `${t('_alert_api_default_warring_desc', {
          message: response.message,
        })} (400)`,
      });
      break;
    }

    case 401: {
      ThrottledAlert({
        type: 'warning',
        title: t('_api_warring_title'),
        content: `${t('_alert_api_default_warring_desc', {
          message: response.message,
        })} (401)`,
      });
      break;
    }

    case 500: {
      ThrottledAlert({
        type: 'error',
        title: t('_alert_api_default_failure_title'),
        content: `${t('_alert_api_default_warring_desc', {
          message: response.message,
        })} (401)`,
      });
      break;
    }

    default: {
      ThrottledAlert({
        type: 'error',
        title: t('_api_warring_title'),
        content: `${response.status || response.message})`,
      });
      break;
    }
  }
};

export default {
  ThrottledAlert,
  DefaultErrorHandler,
  DefaultSuccessHandler,
};
