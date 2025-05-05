import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import Theme from '../../utilities/Theme';
import {AppContext} from '../../context/AppContextProvider';

/**
 * Header for the past and upcomming trips
 * @param {Object} props
 * @param {String} text Text to be displayed in the header
 * @returns Render the header with the given text
 */
export default function TripTypeHeader({text}) {
  const {cs} = useContext(AppContext);
  return (
    <View
      style={[
        cs([
          'app-sborder-color',
          `bgc-${Theme.COLOR.GREY_7}`,
          'app-sborder-color',
        ]),
        {borderBottomWidth: 1},
      ]}>
      <Text
        style={[
          cs([
            'pad-3',
            'app-ptext-color',
            'text-align-center',
            `f-f-${Theme.FONT._HEAVY}`,
            `f-size-${Theme.FONT.SIZE_18}`,
          ]),
        ]}>
        {text}
      </Text>
    </View>
  );
}
