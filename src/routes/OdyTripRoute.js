import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyTrips from '../screens/MyTrips/MyTrips';
import AddTrip from '../screens/AddTrip/AddTrip';
import TripDetails from '../screens/TripDetails/TripDetails';
import StopDetails from '../screens/TripStopDetails/StopDetails';
import TripDayDetails from '../screens/TripDayDetails/TripDayDetails';

import Discover from '../screens/Discover';
import Setup from '../screens/Setup/Setup';
import TripText from '../screens/TripText';
import PdfViewer from '../screens/PdfViewer';
import ImageViewer from '../screens/ImageViewer';
import WebViewer from '../screens/WebViewer/WebViewer';
import BriefingDetails from '../screens/BriefingDetiails';

import Theme from '../utilities/Theme';

export default function OdyTripsRoute() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Discover"
      screenOptions={{
        headerShown: false,
        navigationBarColor: Theme.COLOR.GREY_1,
      }}>
      <Stack.Screen
        name="setup"
        component={Setup}
        options={{gestureEnabled: false}}
        initialParams={{refreshScreen: false}}
      />
      <Stack.Screen
        name="mytripshome"
        component={MyTrips}
        options={{gestureEnabled: false}}
        initialParams={{refreshScreen: false}}
      />
      <Stack.Screen name="addtrip" component={AddTrip} />
      <Stack.Screen name="tripdetails" component={TripDetails} />
      <Stack.Screen name="triptext" component={TripText} />
      <Stack.Screen name="briefingdetails" component={BriefingDetails} />
      <Stack.Screen name="tripdaydetails" component={TripDayDetails} />
      <Stack.Screen name="stopdetails" component={StopDetails} />
      <Stack.Screen name="webviewer" component={WebViewer} />
      <Stack.Screen name="imageviewer" component={ImageViewer} />
      <Stack.Screen name="pdfviewer" component={PdfViewer} />
      <Stack.Screen name="Discover" component={Discover} />
    </Stack.Navigator>
  );
}
