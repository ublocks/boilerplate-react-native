/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  // which alert component should be used.
  // default is "react-native-dropdownalert"
  component: 'react-native-dropdownalert',

  // the status of current alert message
  // hide, show
  status: 'show',

  // the type of current alert message
  // error, success, info, or custom type.
  type: '',

  // alert message title
  title: '',

  // alert message content
  content: '',

  // the display period of current alert message
  closeInterval: 6 * 1000,

  // the style or option props for display current alert
  options: {},

  // extra data for current alert
  extraData: {},

  // the time of current alert message shows
  alertShowAt: null,

  // the history of all alert messages.
  history: [],
};
