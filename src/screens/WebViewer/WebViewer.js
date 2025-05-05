import React, {useEffect, useRef, useState} from 'react';
import {Linking, View} from 'react-native';

import {WebView} from 'react-native-webview';

import CustomTab from '../../components/CustomTab';
import CustomTabText from '../../components/CustomTabText';
import MyTripsHeader from '../../components/MyTripsHeader';

import {isValidData} from '../../utilities/Validator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Theme from '../../utilities/Theme';

let key = 0;
export default function WebViewer({route, navigation}) {
  const {footerLink, pressed} = route.params;

  const paramURL = pressed?.url;
  const webViewRef = useRef();

  const [link, setLink] = useState(pressed?.url);
  const insets = useSafeAreaInsets();
  const [webViewTitle, setWebViewTitle] = useState(pressed?.text);

  const handleNavigation = ({url}) => {
    if (url.startsWith('intent://')) {
      Linking.canOpenURL(paramURL)
        .then(supported => {
          Linking.openURL(paramURL);
        })
        .catch(err => console.log(err));
      return false;
    }
  };

  useEffect(() => {
    key += 1;
  }, [link]);

  const FooterButtonPressed = item => {
    if (item.id === 'maps') {
      Linking.canOpenURL(item?.url)
        .then(supported => {
          Linking.openURL(item?.url);
        })
        .catch(err => console.log(err));
    } else {
      setLink(item?.url);
      setWebViewTitle(item?.text);
    }
  };

  const isShowFooter = pressed?.id != 'general' && pressed?.id != 'weather';

  return (
    <View style={{flex: 1}}>
      <MyTripsHeader
        goBack
        onGoBack={() => {
          navigation.goBack();
        }}
        title={webViewTitle}
      />
      <WebView
        key={key}
        ref={webViewRef}
        style={{flex: 1}}
        source={{uri: link}}
        startInLoadingState={true}
        onNavigationStateChange={handleNavigation}
        originWhitelist={['http://*', 'https://*', 'intent://*']}
      />
      {/* {isShowFooter && isValidData(footerLink) && Array.isArray(footerLink) && (
        <View style={{flexDirection: 'row'}}>
          {footerLink.map(item => {
            return (
              <CustomTab
                key={item?.id}
                onPress={() => FooterButtonPressed(item)}>
                <CustomTabText text={item?.text} />
              </CustomTab>
            );
          })}
        </View>
      )} */}
      <View
        style={{
          paddingBottom: insets.bottom,
          backgroundColor: Theme.COLOR.GREY_1,
        }}
      />
    </View>
  );
}
