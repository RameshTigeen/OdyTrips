import React, {memo, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import Theme from '../utilities/Theme';

import {AppContext} from '../context/AppContextProvider';
import AppText from './AppText';

const InputDropdown = props => {
  const {options, selectedValue, onSelect} = props;
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const {cs} = useContext(AppContext);

  const handleSelect = value => {
    onSelect(value);
    setDropdownVisible(false);
  };
  const isUserSelected = selectedValue?.id === undefined;
  useEffect(() => {
    if (options.length > 0 && isUserSelected) {
      setDropdownVisible(true);
    }
  }, [options.length, isUserSelected]);

  // What if no users were selected
  const userNotSelected =
    selectedValue?.id === undefined && JSON.stringify(selectedValue) === '{}';

  return (
    <>
      <View
        style={cs([
          dropdownVisible ? 'app-pborder-color' : 'app-sborder-color',
          'brd-wid-1',
          'brd-rad-17',
          `bgc-${Theme.COLOR.GREY_7}`,
        ])}>
        <Pressable
          onPress={() => setDropdownVisible(!dropdownVisible)}
          style={cs(['h-50', 'pad-x-10', 'justify-content-center'])}>
          {/* <Text
            style={cs([
              `f-f-${Theme.FONT._ROMAN}`,
              `f-size-${Theme.FONT.SIZE_16}`,
              'c-black',
            ])}>
            {selectedValue?.name !== undefined ? (
              selectedValue.name
            ) : (
              <Text
                style={cs([
                  `c-${Theme.COLOR.GREY_5}`,
                  `f-f-${Theme.FONT._ROMAN}`,
                  `f-size-${Theme.FONT.SIZE_16}`,
                ])}>
                Choose...
              </Text>
            )}
          </Text> */}
          <AppText
            customStyle={[
              `f-f-${Theme.FONT._ROMAN}`,
              `f-size-${Theme.FONT.SIZE_16}`,
              'c-black',
            ]}>
            {selectedValue?.name !== undefined ? (
              selectedValue.name
            ) : (
              <Text
                style={cs([
                  `c-${Theme.COLOR.GREY_5}`,
                  `f-f-${Theme.FONT._ROMAN}`,
                  `f-size-${Theme.FONT.SIZE_16}`,
                ])}>
                Choose...
              </Text>
            )}
          </AppText>
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={dropdownVisible && options.length > 0}
        onRequestClose={() => {
          setDropdownVisible(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View
            style={cs([
              'flex-1',
              'align-items-center',
              'bgc-rgba(0,0,0,0.8)',
              'justify-content-center',
            ])}>
            <View style={cs(['w-70%'])}>
              <ScrollView>
                <View style={[cs(['brd-wid-1', 'brd-rad-13', 'bgc-white'])]}>
                  <DropdownButton
                    key={'none'}
                    value={'None'}
                    onPress={() => {
                      handleSelect({});
                    }}
                    initial
                    selected={userNotSelected}
                  />
                  {options.map((item, index) => {
                    return (
                      <DropdownButton
                        key={item.id}
                        value={item.name}
                        onPress={() => {
                          handleSelect(item);
                        }}
                        final={index === options.length - 1}
                        selected={item.id === selectedValue.id}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

function DropdownButton(props) {
  const {onPress, value, selected, initial = false, final = false} = props;
  const {cs} = useContext(AppContext);
  const [pressIn, setPressIn] = useState(false);
  return (
    <Pressable
      onPressIn={() => {
        setPressIn(true);
      }}
      onPressOut={() => {
        setPressIn(false);
      }}
      style={[
        cs(['pad-18', 'brd-c-white']),
        {borderBottomWidth: 1},
        selected && cs([`bgc-${Theme.COLOR.GREY_2}`]),
        pressIn && {backgroundColor: Theme.COLOR.GREY_4},
        initial && {borderTopLeftRadius: 12, borderTopRightRadius: 12},
        final && {borderBottomLeftRadius: 12, borderBottomRightRadius: 12},
      ]}
      onPress={onPress}>
      {/* <Text
        style={cs([
          `c-${selected || pressIn ? 'white' : 'black'}`,
          `f-f-${Theme.FONT._ROMAN}`,
          `f-size-${Theme.FONT.SIZE_16}`,
        ])}>
        {value}
      </Text> */}
      <AppText
        customStyle={[
          `c-${selected || pressIn ? 'white' : 'black'}`,
          `f-f-${Theme.FONT._ROMAN}`,
          `f-size-${Theme.FONT.SIZE_16}`,
        ]}>
        {value}
      </AppText>
    </Pressable>
  );
}

export default memo(InputDropdown);
