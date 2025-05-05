import React from 'react';

import Theme from '../../utilities/Theme';
import AppText from '../../components/AppText';

export default function TripStopKeyText(props) {
  const {children} = props;
  return (
    <AppText size={Theme.FONT.SIZE_12} family={Theme.FONT._ROMAN}>
      {children}
    </AppText>
  );
}
