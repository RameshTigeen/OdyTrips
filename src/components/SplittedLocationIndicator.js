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
 * Nelson
 * -> Riwaka
 * @returns location indicator
 */
export default function SplittedLocationIndicator(props) {
  const {
    to,
    from,
    fontSize = Theme.FONT.SIZE_14,
    iconSize = Theme.FONT.SIZE_18,
  } = props;
  const {cs} = useContext(AppContext);
  return (
    <View style={[cs(['pad-y-5', 'w-100%']), {maxWidth: 500}]}>
      <Text
        style={cs([
          'app-stext-color',
          `f-size-${fontSize}`,
          `f-f-${Theme.FONT._ROMAN}`,
        ])}>
        {from}
      </Text>

      <View style={cs(['flex-row', 'align-items-center', 'mar-t-4'])}>
        <LocalSvgIcon
          size={iconSize}
          name="LocationPointer"
          color={Theme.COLOR.GREY_6}
        />
        <Text
          style={cs([
            'mar-l-15',
            'app-stext-color',
            `f-size-${fontSize}`,
            `f-f-${Theme.FONT._ROMAN}`,
          ])}>
          {to}
        </Text>
      </View>
    </View>
  );
}
