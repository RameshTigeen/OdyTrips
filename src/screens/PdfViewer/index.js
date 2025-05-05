/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';
import MyTripsHeader from '../../components/MyTripsHeader';
import Theme from '../../utilities/Theme';
import AppView from '../../components/AppView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function PdfViewer({navigation, route}) {
  const {base64, title = ''} = route.params;

  const source = {
    uri: base64,
  };

  const insets = useSafeAreaInsets();

  return (
    <AppView style={styles.container}>
      <MyTripsHeader
        title={title}
        page="tripText"
        goBack
        onGoBack={() => {
          navigation.goBack();
        }}
      />
      <Pdf source={source} style={styles.pdf} />
      <View
        style={{
          paddingBottom: insets.bottom,
          backgroundColor: Theme.COLOR.GREY_1,
        }}
      />
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Theme.COLOR.GREY_1,
  },
  pdf: {
    flex: 1,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
