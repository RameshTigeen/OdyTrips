import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {AppContext} from '../../context/AppContextProvider';
import Theme from '../../utilities/Theme';
import AppText from '../../components/AppText';

export default function AddTripHeadingLabel() {
  const {cs} = useContext(AppContext);
  const LabelFontSize = Theme.FONT.SIZE_18;
  return (
    <View
      style={cs([
        'justify-content-center',
        'align-items-center',
        'w-100%',
        'mar-t-30',
        'mar-b-10',
      ])}>
      <View style={cs(['w-70%'])}>
        <Text
          style={cs([
            'app-ptext-color',
            'text-align-center',
            `f-f-${Theme.FONT._ROMAN}`,
            `f-size-${LabelFontSize}`,
          ])}>
          Enter the{' '}
          <AppText
            size={LabelFontSize}
            customStyle={'f-w-bold'}
            family={Theme.FONT._HEAVY}
            varient={'primary'}>
            Trip Code
          </AppText>{' '}
          &{' '}
          <AppText
            size={LabelFontSize}
            customStyle={'f-w-bold'}
            family={Theme.FONT._HEAVY}
            varient={'primary'}>
            Reference Number
          </AppText>
          , supplied by your Tour Operator
        </Text>
      </View>
    </View>
  );
}
