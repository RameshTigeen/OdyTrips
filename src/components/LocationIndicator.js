import React, {useContext} from 'react';
import {View, Text} from 'react-native';

import {AppContext} from '../context/AppContextProvider';
import Theme from '../utilities/Theme';
import LocalSvgIcon from '../utilities/SvgManager';

/**
 * Used to display the locations
 * @param {Object} props Component properties
 * @param {String} props.from From location
 * @param {String} props.to To location
 * @param {Number} props.fontSize Font size for the text(locations)
 * @param {Number} props.iconSize Icon size
 * @example
 * Result:
 * Nelson -> Riwaka
 * @returns location indicator
 */
export default function LocationIndicator(props) {
  const {
    to,
    from,
    style = 'normal',
    fontSize = Theme.FONT.SIZE_14,
    iconSize = Theme.FONT.SIZE_18,
  } = props;
  const {cs} = useContext(AppContext);
  return (
    <View style={cs(['flex-row', 'pad-y-5', 'w-100%'])}>
      <View style={cs(['w-40%'])}>
        <Text
          style={cs([
            `f-w-${style}`,
            'app-stext-color',
            `f-size-${fontSize}`,
            `f-f-${Theme.FONT._ROMAN}`,
          ])}
          numberOfLines={1}
          ellipsizeMode="middle">
          {from}
        </Text>
      </View>

      <View style={cs(['w-10%', 'align-items-start'])}>
        <LocalSvgIcon
          size={iconSize}
          name="LocationPointer"
          color={Theme.COLOR.GREY_6}
        />
      </View>

      <View style={cs(['w-50%', 'align-items-start'])}>
        <Text
          style={[
            cs([
              `f-w-${style}`,
              'app-stext-color',
              `f-size-${fontSize}`,
              `f-f-${Theme.FONT._ROMAN}`,
            ]),
          ]}
          numberOfLines={1}
          ellipsizeMode="middle">
          {to}
        </Text>
      </View>
    </View>
  );
}
