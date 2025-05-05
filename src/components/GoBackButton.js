import React from 'react';
import {Pressable} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import LocalSvgIcon from '../utilities/SvgManager';

export default function GoBackButton({navigation}) {
  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}>
      <LocalSvgIcon name="ChevronLeft" color="black" size="30" />
    </Pressable>
  );
}
