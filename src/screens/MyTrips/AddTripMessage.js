import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import Theme from '../../utilities/Theme';

import {AppContext} from '../../context/AppContextProvider';

export default function AddTripMessage() {
  const {cs} = useContext(AppContext);
  return (
    <View
      style={cs(['flex-1', 'justify-content-center', 'align-items-center'])}>
      <View style={cs(['w-70%'])}>
        <Text
          style={cs([
            'mar-y-10',
            'app-stext-color',
            'text-align-center',
            `f-f-${Theme.FONT._ROMAN}`,
            `f-size-${Theme.FONT.SIZE_18}`,
          ])}>
          Use the '
          <Text
            style={cs([
              'app-ptext-color',
              `f-f-${Theme.FONT._ROMAN}`,
              `f-size-${Theme.FONT.SIZE_18}`,
            ])}>
            + Trip
          </Text>
          ' button to add your next Trip
        </Text>
        <Text
          style={cs([
            'mar-y-10',
            'app-stext-color',
            'text-align-center',
            `f-f-${Theme.FONT._ROMAN}`,
            `f-size-${Theme.FONT.SIZE_18}`,
          ])}>
          You'll need the 'Trip Code' supplied by the Operator
        </Text>
      </View>
    </View>
  );
}
