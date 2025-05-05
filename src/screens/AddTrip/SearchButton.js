import React, {useContext} from 'react';
import {ActivityIndicator, Pressable, View, Text} from 'react-native';

import Theme from '../../utilities/Theme';
import LocalSvgIcon from '../../utilities/SvgManager';

import {AppContext} from '../../context/AppContextProvider';

export default function SearchButton(props) {
  const {onPress, loading} = props;
  const {cs} = useContext(AppContext);
  return (
    <Pressable
      onPress={onPress}
      style={cs([
        'pad-x-15',
        'h-50',
        'w-150',
        'flex-1',
        'brd-wid-1',
        'brd-rad-12',
        'app-sborder-color',
        'app-pbutton-color',
        'align-items-center',
        'justify-content-center',
      ])}>
      <View
        style={cs([
          'flex-row',
          'justify-content-center',
          'align-items-center',
        ])}>
        {loading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <>
            <LocalSvgIcon
              name="Search"
              color="white"
              size={Theme.FONT.SIZE_24}
            />
            <Text
              style={cs([
                'c-white',
                'mar-l-10',
                `f-size-${Theme.FONT.SIZE_18}`,
              ])}>
              Search
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
}
