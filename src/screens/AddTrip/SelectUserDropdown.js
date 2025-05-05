import React, {memo, useContext} from 'react';
import {AppContext} from '../../context/AppContextProvider';
import {AddTripContext} from '../../context/AddTripContextProvider';
import Theme from '../../utilities/Theme';
import {View} from 'react-native';
import AppText from '../../components/AppText';
import InputDropdown from '../../components/InputDropdown';

function SelectUserDropdown() {
  const {cs} = useContext(AppContext);
  const {tripUsers, selectedUser, setSelectedUser} = useContext(AddTripContext);
  return (
    <View
      style={cs([
        'w-100%',
        'align-items-center',
        'justify-content-center',
        `mar-y-${Theme.FONT.SIZE_14}`,
      ])}>
      <View style={cs(['w-90%', 'pad-b-10'])}>
        <AppText
          size={Theme.FONT.SIZE_18}
          customStyle={['text-align-center', 'mar-b-10']}
          family={Theme.FONT._ROMAN}
          varient={'primary'}>
          Select your name from this list
        </AppText>
      </View>
      <View style={cs(['w-70%', 'pad-b-20'])}>
        <InputDropdown
          options={tripUsers}
          selectedValue={selectedUser}
          onSelect={setSelectedUser}
        />
        <AppText customStyle={['mar-t-10', 'text-align-center']}>
          If your name is not in the list, please contact your Tour Operator
        </AppText>
      </View>
    </View>
  );
}

export default memo(SelectUserDropdown);
