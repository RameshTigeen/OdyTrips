import {useContext, useState} from 'react';
import {Pressable, View} from 'react-native';
import {AppContext} from '../../context/AppContextProvider';
import AppText from '../../components/AppText';
import Theme from '../../utilities/Theme';
import LocalSvgIcon from '../../utilities/SvgManager';

export default function TripTextPressable({text, onPress}) {
  const {cs} = useContext(AppContext);
  const [pressing, setPressing] = useState(false);
  return (
    <Pressable
      style={[
        cs([
          'flex-row',
          'pad-y-10',
          'pad-x-10',
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
      <AppText size={Theme.FONT.SIZE_18}>{text}</AppText>
      <LocalSvgIcon
        name="CaretRight"
        size={Theme.FONT.SIZE_24}
        color={Theme.COLOR.GREY_4}
      />
    </Pressable>
  );
}
