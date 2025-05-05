import React from 'react';
import AppText from './AppText';
import Theme from '../utilities/Theme';

export default function CustomTabText({text}) {
  return (
    <AppText customStyle={['c-white', 'mar-l-10']} size={Theme.FONT.SIZE_18}>
      {text}
    </AppText>
  );
}
