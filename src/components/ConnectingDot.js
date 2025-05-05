import React, {useContext} from 'react';
import {View, Text} from 'react-native';

import Theme from '../utilities/Theme';

import {AppContext} from '../context/AppContextProvider';

/**
 * Used to create the connected dots in the app
 * @param {Object} props Properites
 * @param {String} props.color Color of the dots
 * @param {Number} props.dotCount Number of dots should be placed
 * @returns Connected dots
 */
export default function ConnectingDot(props) {
  const {dotCount, color = Theme.COLOR.GREY_4} = props;
  const {cs} = useContext(AppContext);
  return (
    <View style={cs(['align-self-center'])}>
      {Array(dotCount)
        .fill('|')
        .map((item, index) => (
          <Text
            key={index}
            style={cs([`c-${color}`, 'f-size-10', 'h-6', 'f-w-bold'])}>
            {item}
          </Text>
        ))}
    </View>
  );
}
