import React, {useContext, useState} from 'react';
import {View, Pressable} from 'react-native';

import AppText from '../../components/AppText';
import TripIcon from '../../components/TripIcon';
// import ConnectingDot from '../../components/ConnectingDot';

import {AppContext} from '../../context/AppContextProvider';

import Theme from '../../utilities/Theme';
import {isValidData} from '../../utilities/Validator';
import LocalSvgIcon from '../../utilities/SvgManager';
import {TimeFormatter} from '../../utilities/Formatter';

export default function TripStop(props) {
  const {title, address, city, time, type, onPress, base64, fileName} = props;

  const [pressing, setPressing] = useState(false);

  const {cs, deviceInfo} = useContext(AppContext);
  return (
    <Pressable
      style={[
        cs([
          'flex-1',
          'flex-row',
          'pad-x-15',
          'pad-y-10',
          'app-sborder-color',
          'justify-content-between',
        ]),
        {borderBottomWidth: 0.3},
        pressing && cs([`bgc-${Theme.COLOR.GREY_7}`]),
      ]}
      onPressIn={() => {
        setPressing(true);
      }}
      onPressOut={() => {
        setPressing(false);
      }}
      onPress={onPress}>
      <View style={cs(['flex-15'])}>
        <TripIcon
          type={type}
          base64={base64}
          alignment={'start'}
          fileName={fileName}
        />
      </View>
      <View style={cs([`flex-${deviceInfo.largeDevice ? '65' : '60'}`])}>
        {isValidData(title) && (
          <AppText
            customStyle={['mar-b-3']}
            size={Theme.FONT.SIZE_16}
            family={Theme.FONT._HEAVY}>
            {title}
          </AppText>
        )}
        {isValidData(address) && (
          <AppText>{address.replace(/\r|¶/g, '\n')}</AppText>
        )}
        {isValidData(city) && <AppText>{city}</AppText>}
      </View>
      <View
        style={[
          cs([
            `flex-${deviceInfo.largeDevice ? '20' : '25'}`,
            'align-items-end',
            'justify-content-center',
          ]),
          {gap: 5},
        ]}>
        {isValidData(time) && <AppText>{TimeFormatter(time)}</AppText>}
        <View
          style={cs([
            'flex-row',
            'pos-relative',
            'flex-1',
            'align-items-center',
          ])}>
          <LocalSvgIcon
            name="ChevronRightBold"
            size={Theme.FONT.SIZE_24}
            color={Theme.COLOR.GREY_4}
          />
        </View>
      </View>
    </Pressable>
  );
}
