import React, {useContext} from 'react';
import {AppContext} from '../../context/AppContextProvider';
import {View, Pressable} from 'react-native';
import AppText from '../../components/AppText';
import Theme from '../../utilities/Theme';
import LocalSvgIcon from '../../utilities/SvgManager';

export default function DayChanger(props) {
  const {day, nextDay, previousDay, onPressNextDay, onPressPreviousDay} = props;
  const {cs} = useContext(AppContext);
  return (
    <View style={cs(['flex-row', 'align-items-center'])}>
      <Pressable
        onPress={onPressPreviousDay}
        style={{opacity: previousDay ? 1 : 0}}>
        <LocalSvgIcon
          name="ChevronLeftBold"
          size={Theme.FONT.SIZE_24}
          color={Theme.COLOR.GREY_3}
        />
      </Pressable>
      <AppText size={Theme.FONT.SIZE_16}>Day {day}</AppText>
      <Pressable onPress={onPressNextDay} style={{opacity: nextDay ? 1 : 0}}>
        <LocalSvgIcon
          name="ChevronRightBold"
          size={Theme.FONT.SIZE_24}
          color={Theme.COLOR.GREY_3}
        />
      </Pressable>
    </View>
  );
}
