import React from 'react';

import Theme from '../../utilities/Theme';
import AppText from '../../components/AppText';

export default function TripStopValueText(props) {
  const {children, varient = 'secondary'} = props;
  return (
    <AppText
      size={Theme.FONT.SIZE_14}
      varient={varient}
      family={Theme.FONT._ROMAN}>
      {children}
    </AppText>
  );
}
