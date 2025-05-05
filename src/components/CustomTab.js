import React, {useContext, useState} from 'react';
import {Pressable, View} from 'react-native';

import {AppContext} from '../context/AppContextProvider';

export default function CustomTab({onPress, children, style}) {
  const {cs} = useContext(AppContext);
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        setPressed(true);
      }}
      onPressOut={() => {
        setPressed(false);
      }}
      style={[
        cs([
          `h-65`,
          'flex-1',
          'brd-wid-1',
          'app-sborder-color',
          'align-items-center',
          'justify-content-center',
          `${pressed ? 'app-sbutton-color' : 'app-pbutton-color'}`,
        ]),
        {
          borderBottomWidth: 0,
        },
        style,
      ]}>
      <View
        style={[
          cs(['flex-row', 'justify-content-center', 'align-items-center']),
        ]}>
        {children}
      </View>
    </Pressable>
  );
}
