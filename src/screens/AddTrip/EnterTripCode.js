import React, {forwardRef, memo, useContext} from 'react';
import {View} from 'react-native';

import Input from '../../components/Input';

import {AppContext} from '../../context/AppContextProvider';
import {AddTripFormContext} from '../../context/AddTripFormContextProvider';
import Theme from '../../utilities/Theme';

const EnterTripCode = forwardRef((props, ref) => {
  const {goToReferenceInput} = props;
  const {cs} = useContext(AppContext);
  const {localTripCode, setLocalTripCode} = useContext(AddTripFormContext);
  return (
    <View
      style={cs([
        'w-100%',
        'mar-b-20',
        'align-items-center',
        'justify-content-center',
      ])}>
      <View style={cs(['w-70%'])}>
        <Input
          ref={ref}
          value={localTripCode}
          placeHolder={'Trip Code'}
          autoCapitalize={'characters'}
          backgroundColor={Theme.COLOR.GREY_7}
          setValue={setLocalTripCode}
          onSubmitEditing={() => {
            goToReferenceInput();
          }}
          enterKeyHint="next"
        />
      </View>
    </View>
  );
});

export default memo(EnterTripCode);
