import {Platform, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Theme from '../utilities/Theme';

export default function AppView({children, ...props}) {
  const {left, right, bottom} = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          flex: 1,
          paddingLeft: left,
          paddingRight: right,
          // paddingBottom: bottom,
          // backgroundColor: Theme.COLOR.GREY_1,
        },
        props.style,
      ]}
      {...props}>
      {children}
    </View>
  );
}
