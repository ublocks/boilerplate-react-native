import React from 'react';
import { Stack, Scene } from 'react-native-router-flux';

// Custom Scenes
import RootScreen from 'App/Containers/Root/RootScreen';
import ApiExampleScreen from 'App/Containers/Example/ApiExampleScreen';
import FcmExampleScreen from 'App/Containers/Example/FcmExampleScreen';

export default () => {
  return (
    <Stack key="root">
      <Scene key="RootScreen" component={RootScreen} hideNavBar initial />
      <Scene key="ApiExampleScreen" component={ApiExampleScreen} />
      <Scene key="FcmExampleScreen" component={FcmExampleScreen} />
    </Stack>
  );
};
