import React, {useContext} from 'react';
import {View} from 'react-native';

import Theme from '../utilities/Theme';
import AppText from '../components/AppText';

import {AppContext} from '../context/AppContextProvider';
import LocalSvgIcon from '../utilities/SvgManager';

/**
 * Used to display the locations
 * @param {String} startDate Formatted utc date (Mon, 04 Mar 24)
 * @param {String} endDate Formatted utc date (Mon, 04 Mar 24)
 * @param {Number} fontSize Font size for the text(locations)
 * @example
 * Result:
 * Sunday        Friday
 * 21 May 23     26 May 23
 * @returns Formatted date view
 */
export default function DateIndicator({
  endDate,
  startDate,
  fontSize = Theme.FONT.SIZE_14,
}) {
  const {cs} = useContext(AppContext);
  const SplittedStartDate = startDate.split(', ');
  const SplittedEndDate = endDate.split(', ');

  const startDay = GetFullDayName(SplittedStartDate[0]);
  const endDay = GetFullDayName(SplittedEndDate[0]);
  const formattedStartDate = SplittedStartDate[1];
  const formattedEndDate = SplittedEndDate[1];
  return (
    <View style={[cs(['flex-row', 'pad-y-5', 'w-100%'])]}>
      <View style={cs(['w-50%'])}>
        <AppText size={fontSize}>{startDay}</AppText>
        <AppText size={fontSize}>{formattedStartDate}</AppText>
      </View>
      <View
        style={cs([
          'w-50%',
          'flex-row',
          'align-items-center',
          'justify-content-between',
        ])}>
        <View style={cs(['align-items-start'])}>
          <AppText size={fontSize}>{endDay}</AppText>
          <AppText size={fontSize}>{formattedEndDate}</AppText>
        </View>
        <LocalSvgIcon
          name="CaretRight"
          size={Theme.FONT.SIZE_20}
          color={Theme.COLOR.GREY_4}
        />
      </View>
    </View>
  );
}

function GetFullDayName(ShortDayString) {
  // 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  let FormattedDayName = '';
  switch (ShortDayString) {
    case 'Sun': {
      FormattedDayName = 'Sunday';
      break;
    }
    case 'Mon': {
      FormattedDayName = 'Monday';
      break;
    }
    case 'Tue': {
      FormattedDayName = 'Tuesday';
      break;
    }
    case 'Wed': {
      FormattedDayName = 'Wednesday';
      break;
    }
    case 'Thu': {
      FormattedDayName = 'Thursday';
      break;
    }
    case 'Fri': {
      FormattedDayName = 'Friday';
      break;
    }
    case 'Sat': {
      FormattedDayName = 'Saturday';
      break;
    }
  }
  return FormattedDayName;
}
