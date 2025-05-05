import React, {useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {AppContext} from '../context/AppContextProvider';
import Theme from '../utilities/Theme';

export default function Spinner() {
  const {cs} = useContext(AppContext);
  return (
    <View
      style={cs(['flex-1', 'justify-content-center', 'app-pbackground-color'])}>
      <ActivityIndicator size={'large'} color={Theme.COLOR.GREY_1} />
    </View>
  );
}
