import React, {createContext, useEffect, useState} from 'react';
import {useColorScheme, useWindowDimensions} from 'react-native';
import StyleRenderer from '../utilities/StyleRenderer';
import {useNetInfo} from '@react-native-community/netinfo';
import {getUniqueId} from 'react-native-device-info';

export const AppContext = createContext();
export default function AppContextProvider({children}) {
  const [tripData, setTripData] = useState({
    status: false,
    data: [],
  });
  const [deviceId, setDeviceId] = useState('');
  // Get the color scheme light | dark
  const mode = useColorScheme();

  // Style Renderer
  const styleRenderer = new StyleRenderer(mode);

  // Dimenstions
  const dimensions = useWindowDimensions();

  // Device details
  const deviceInfo = {
    orientation:
      dimensions.height > dimensions.width ? 'portrait' : 'landscape',
    largeDevice: dimensions.width > 600,
  };
  useEffect(() => {
    const StoreUniqueId = async () => {
      const id = await getUniqueId();
      if (id !== null) {
        setDeviceId(id);
      }
    };
    StoreUniqueId();
  }, [deviceId]);

  const netInfo = useNetInfo();

  // Global context values
  const value = {
    mode: mode,
    dimensions: dimensions,
    netInfo: netInfo,
    deviceInfo: deviceInfo,
    tripData: tripData,
    deviceId: deviceId,
    setDeviceId: setDeviceId,
    setTripData: setTripData,
    cs: style => styleRenderer.CustomStyle(style),
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
