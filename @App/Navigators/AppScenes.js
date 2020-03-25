import React from 'react';
import { Stack, Scene } from 'react-native-router-flux';
import { BaseNavBar } from 'App/Components';
import { Colors } from 'App/Theme';

// Custom Scenes
import RootScreen from 'App/Containers/Root/RootScreen';
import ApiExampleScreen from 'App/Containers/Example/ApiExampleScreen';
import FcmExampleScreen from 'App/Containers/Example/FcmExampleScreen';

export default function AppScenes() {
  return (
    <Stack key="root" navBar={BaseNavBar}>
      <Scene
        key="RootScreen"
        component={RootScreen}
        topBarColor={Colors.white}
        bottomBarColor={Colors.white}
        title="THE ROOTs"
        initial
      />
      <Scene
        key="ApiExampleScreen"
        component={ApiExampleScreen}
        topBarColor={Colors.success}
        bottomBarColor={Colors.primary}
      />
      <Scene
        key="FcmExampleScreen"
        component={FcmExampleScreen}
        topBarColor={Colors.primary}
        bottomBarColor={Colors.success}
      />
    </Stack>
  );
}
