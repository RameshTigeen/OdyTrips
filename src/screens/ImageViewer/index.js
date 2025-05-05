import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import MyTripsHeader from '../../components/MyTripsHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Theme from '../../utilities/Theme';

export default function ImageViewer({navigation, route}) {
  const {base64, title = ''} = route.params;
  const insets = useSafeAreaInsets();
  const htmlContent = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        ">
        <img
          width="90%"
          src="${base64}"
          alt=${title} />
      </div>
    </body>
  </html>`;
  return (
    <View style={{flex: 1}}>
      <MyTripsHeader
        title={title}
        page="tripText"
        goBack
        onGoBack={() => {
          navigation.goBack();
        }}
      />
      <WebView source={{html: htmlContent}} style={{flex: 1}} />
      <View
        style={{
          paddingBottom: insets.bottom,
          backgroundColor: Theme.COLOR.GREY_1,
        }}
      />
    </View>
  );
}
