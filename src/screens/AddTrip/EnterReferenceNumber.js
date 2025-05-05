import React, {forwardRef, memo, useContext} from 'react';
import {View} from 'react-native';

import Input from '../../components/Input';

import Theme from '../../utilities/Theme';

import {AppContext} from '../../context/AppContextProvider';
import {AddTripFormContext} from '../../context/AddTripFormContextProvider';

const EnterReferenceNumber = forwardRef((props, ref) => {
  const {cs} = useContext(AppContext);
  const {localReferenceNumber, setLocalReferenceNumber} =
    useContext(AddTripFormContext);
  return (
    <View
      style={cs([
        'justify-content-center',
        'align-items-center',
        'w-100%',
        `mar-b-${Theme.FONT.SIZE_14}`,
      ])}>
      <View style={cs(['w-70%'])}>
        <Input
          ref={ref}
          value={localReferenceNumber}
          placeHolder={'Reference Number'}
          backgroundColor={Theme.COLOR.GREY_7}
          setValue={setLocalReferenceNumber}
        />
      </View>
    </View>
  );
});

export default memo(EnterReferenceNumber);
