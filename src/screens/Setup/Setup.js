import React, {useContext, useEffect} from 'react';
import {Alert} from 'react-native';

import Spinner from '../../components/Spinner';
import {UpdateLocalStorageFromServer} from '../../utilities/Api';
import {GetLocalStorage} from '../../utilities/FileStorage';
import {AppContext} from '../../context/AppContextProvider';

export default function Setup({navigation}) {
  const {netInfo, setTripData, deviceId} = useContext(AppContext);

  const ValidateApiResponseFromBackend = async response => {
    if (response?.status) {
      setTripData(response?.response);
    } else {
      Alert.alert('', response?.message);
      const data = await GetLocalStorage('tripdata');

      if (data.status) {
        setTripData(data.data);
      }
    }
    navigation.replace('mytripshome');
  };

  const MoveToMainPageWithLocalData = async () => {
    const data = await GetLocalStorage('tripdata');

    if (data?.status) {
      setTripData(data?.data);
    }
    navigation.replace('mytripshome');
  };

  useEffect(() => {
    if (netInfo.isConnected !== null && deviceId !== '') {
      // netInfo.isConnected
      //   ? UpdateLocalStorageFromServer(deviceId, ValidateApiResponseFromBackend)
      //   : MoveToMainPageWithLocalData();
      MoveToMainPageWithLocalData();
    }
  }, [netInfo.isConnected, deviceId]);

  return <Spinner />;
}
