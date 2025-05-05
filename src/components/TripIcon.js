import React, {useContext} from 'react';
import {Image} from 'react-native';
import Theme from '../utilities/Theme';

import {AppContext} from '../context/AppContextProvider';
import GenerateBase64 from '../utilities/GenerateBase64';

export default function TripIcon(props) {
  const {type, base64, fileName} = props;
  const {cs} = useContext(AppContext);
  const {base64String: base64Url} = GenerateBase64(base64, fileName);
  return (
    <Image
      // source={Icon(type)}
      source={{uri: base64Url}}
      style={cs([`h-${Theme.FONT.SIZE_28}`, `w-${Theme.FONT.SIZE_28}`])}
      resizeMode="contain"
    />
  );
}
