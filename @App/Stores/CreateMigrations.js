import { createMigrate } from 'redux-persist';

const migrations = {
  // 0: (state) => {
  //   // migration clear out device state
  //   return {
  //     ...state,
  //     device: undefined,
  //   };
  // },
  // 1: (state) => {
  //   // migration to keep only device state
  //   return {
  //     device: state.device,
  //   };
  // },
};

export default createMigrate(migrations, { debug: __DEV__ });
