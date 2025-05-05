import React, {useContext} from 'react';
import {View, Linking} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import CustomTab from './CustomTab';
import CustomTabText from './CustomTabText';

import Theme from '../utilities/Theme';
import LocalSvgIcon from '../utilities/SvgManager';

import {AppContext} from '../context/AppContextProvider';

export default function MyTripsFooter(props) {
  const {cs} = useContext(AppContext);
  const {link} = props;
  const navigation = useNavigation();

  const FooterButtonPressed = item => {
    const navigateTo = item?.navigateTo ?? 'webviewer';

    if (navigateTo === 'webviewer') {
      if (!item?.url) return;

      if (item?.id === 'maps') {
        Linking.canOpenURL(item?.url)
          .then(supported => {
            Linking.openURL(item?.url);
          })
          .catch(err => console.log(err, item));
        return;
      } else {
        navigation.navigate(navigateTo, {
          footerLink: link,
          pressed: item,
        });
      }
    } else navigation.navigate(navigateTo, {});
  };

  return (
    <View style={cs(['flex-row'])}>
      {link.map((item, index) => {
        const tabIcon =
          item?.icon === 'account'
            ? 'EditUser'
            : item?.icon === 'trip'
            ? 'Add'
            : item?.icon === 'addtrip'
            ? 'Reply'
            : item?.icon;

        return (
          <CustomTab
            key={item?.id ?? index}
            onPress={() => FooterButtonPressed(item)}>
            {item?.icon && (
              <LocalSvgIcon
                name={tabIcon}
                color={item?.textColor ?? 'white'}
                size={Theme.FONT.SIZE_36}
              />
            )}
            {!item.textHidden && item?.text && (
              <CustomTabText text={item?.text} cs={cs} />
            )}
          </CustomTab>
        );
      })}
    </View>
  );
}
