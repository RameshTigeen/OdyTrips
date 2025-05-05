import React, {useEffect} from 'react';

import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import OdyTripsRoute from './src/routes/OdyTripRoute';

import AppContextProvider from './src/context/AppContextProvider';

import AppView from './src/components/AppView';

export default function App() {
  useEffect(() => {
    RNBootSplash.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <AppContextProvider>
        <AppView>
          <NavigationContainer>
            <OdyTripsRoute />
          </NavigationContainer>
        </AppView>
      </AppContextProvider>
    </SafeAreaProvider>
  );
}
