import React, { useEffect } from 'react';
import { Platform, UIManager } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';
import { AppProvider } from './App.provider';

export const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};
