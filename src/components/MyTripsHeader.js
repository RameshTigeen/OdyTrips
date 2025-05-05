import React, {useContext} from 'react';
import {View, Text, Image, Pressable, StatusBar, Linking} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import AppData from '../Config';
import Icon from '../utilities/Icon';
import Theme from '../utilities/Theme';
import LocalSvgIcon from '../utilities/SvgManager';

import {AppContext} from '../context/AppContextProvider';

const MyTripsHeader = ({page = 'home', title, goBack, onGoBack}) => {
  const {cs, deviceInfo} = useContext(AppContext);

  let titleAlignment = 'center',
    titleFontSize = Theme.FONT.SIZE_20,
    logoAlignment = 'center',
    logoRightMargin = '0',
    backButtonContainerWidth = '20%',
    titleContainerWidth = '60%',
    logoContainerWidth = '20%';

  switch (page) {
    case 'home': {
      titleFontSize = Theme.FONT.SIZE_24;
      logoAlignment = 'end';
      logoRightMargin = '25';
      break;
    }
    case 'tripDetails': {
      logoAlignment = 'end';
      titleAlignment = deviceInfo.largeDevice ? 'center' : 'start';
      titleContainerWidth =
        deviceInfo.largeDevice || deviceInfo.orientation === 'landscape'
          ? '60%'
          : '70%';
      backButtonContainerWidth =
        deviceInfo.largeDevice || deviceInfo.orientation === 'landscape'
          ? '20%'
          : '10%';
      break;
    }
    case 'tripDayDetails': {
      backButtonContainerWidth = deviceInfo.largeDevice
        ? '20%'
        : deviceInfo.orientation === 'landscape'
        ? '25%'
        : '15%';
      titleContainerWidth = '60%';
      logoAlignment = 'end';
      logoContainerWidth =
        deviceInfo.largeDevice || deviceInfo.orientation === 'landscape'
          ? '20%'
          : '25%';
      titleAlignment =
        deviceInfo.largeDevice || deviceInfo.orientation === 'landscape'
          ? 'center'
          : 'start';
      break;
    }
    case 'tripSpotDetails': {
      backButtonContainerWidth = deviceInfo.largeDevice
        ? '20%'
        : deviceInfo.orientation === 'landscape'
        ? '25%'
        : '18%';
      titleContainerWidth = deviceInfo.largeDevice
        ? '60%'
        : deviceInfo.orientation === 'landscape'
        ? '50%'
        : '57%';
      logoContainerWidth =
        deviceInfo.largeDevice || deviceInfo.orientation === 'landscape'
          ? '20%'
          : '25%';
      titleAlignment =
        deviceInfo.largeDevice || deviceInfo.orientation === 'landscape'
          ? 'center'
          : 'start';
      break;
    }
    case 'tripText': {
      titleFontSize = Theme.FONT.SIZE_24;
      backButtonContainerWidth = '10%';
      titleContainerWidth = '70%';
      logoContainerWidth = '20%';
      titleAlignment = 'start';
      break;
    }

    case 'Discover': {
      titleAlignment = deviceInfo.largeDevice ? 'center' : 'start';
      titleContainerWidth =
        deviceInfo.largeDevice || deviceInfo.orientation === 'landscape'
          ? '60%'
          : '70%';
      logoRightMargin = '20';
      backButtonContainerWidth =
        deviceInfo.largeDevice || deviceInfo.orientation === 'landscape'
          ? '20%'
          : '10%';
      break;
    }
  }

  const insets = useSafeAreaInsets();

  const LogoPressed = () => {
    Linking.canOpenURL(AppData.MYODYSSEY_URL)
      .then(supported => {
        Linking.openURL(AppData.MYODYSSEY_URL);
      })
      .catch(err => console.log(err));
  };

  return (
    <View
      style={cs([
        'pad-5',
        'pad-x-15',
        'flex-row',
        'app-pbutton-color',
        `pad-t-${insets.top}`,
      ])}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Theme.COLOR.GREY_2}
      />
      <View
        style={cs([
          'align-items-start',
          'justify-content-center',
          `w-${backButtonContainerWidth}`,
        ])}>
        {goBack && (
          <Pressable onPress={onGoBack} style={{marginLeft: -6}}>
            <LocalSvgIcon name="ChevronLeft" color="white" size={30} />
          </Pressable>
        )}
      </View>
      <View
        style={cs([
          'flex-row',
          'align-items-center',
          `w-${titleContainerWidth}`,
          `justify-content-${titleAlignment}`,
        ])}>
        <Text
          numberOfLines={1}
          ellipsizeMode="middle"
          style={cs([
            'c-white',
            `f-size-${titleFontSize}`,
            `f-f-${Theme.FONT._HEAVY}`,
          ])}>
          {title}
        </Text>
      </View>
      <View
        style={cs([
          `w-${logoContainerWidth}`,
          `pad-r-${logoRightMargin}`,
          `align-items-${logoAlignment}`,
        ])}>
        <Pressable style={cs(['h-45', 'w-45'])} onPress={LogoPressed}>
          <Image
            resizeMode="contain"
            source={Icon('appicon')}
            style={cs(['h-100%', 'w-100%', 'brd-rad-23', 'bgc-white'])}
          />
        </Pressable>
      </View>
    </View>
  );
};
export default MyTripsHeader;
