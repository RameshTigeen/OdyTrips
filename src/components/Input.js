import React, {forwardRef, memo, useContext, useState} from 'react';
import {TextInput, View} from 'react-native';

import Theme from '../utilities/Theme';

import {AppContext} from '../context/AppContextProvider';

const Input = forwardRef(
  (
    {value, setValue, placeHolder, backgroundColor = 'white', ...other},
    ref,
  ) => {
    const {cs} = useContext(AppContext);
    const [focus, setFocus] = useState(false);

    return (
      <View
        style={cs([
          'brd-wid-1',
          'brd-rad-12',
          `bgc-${backgroundColor}`,
          focus ? 'app-pborder-color' : 'app-sborder-color',
        ])}>
        <TextInput
          ref={ref}
          value={value}
          onChangeText={setValue}
          placeholder={placeHolder}
          placeholderTextColor={Theme.COLOR.GREY_5}
          onBlur={() => {
            setFocus(false);
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onEndEditing={() => {
            setFocus(false);
          }}
          style={cs([
            'h-50',
            'c-black',
            'pad-x-10',
            `f-f-${Theme.FONT._ROMAN}`,
            `f-size-${Theme.FONT.SIZE_16}`,
          ])}
          {...other}
        />
      </View>
    );
  },
);
export default memo(Input);
