import React, {memo, useState, useContext} from 'react';
import {ActivityIndicator, Alert, Text, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import CustomTab from '../../components/CustomTab';

import Theme from '../../utilities/Theme';
import LocalSvgIcon from '../../utilities/SvgManager';
import {AddTripValidator} from '../../utilities/Validator';
import {AddTripToUser} from '../../utilities/Api';

import {AppContext} from '../../context/AppContextProvider';
import {AddTripContext} from '../../context/AddTripContextProvider';

function AddTripFooterButton({RemoveFocus}) {
  const navigation = useNavigation();

  const [addTripLoader, setAddTripLoader] = useState(false);

  const {cs, deviceId} = useContext(AppContext);
  const addTripContextValues = useContext(AddTripContext);

  const HandleAddTrip = () => {
    RemoveFocus();
    setAddTripLoader(true);

    const LocalValidationSuccessful = () => {
      const HandleApiResponse = response => {
        setAddTripLoader(false);
        if (response.status) {
          navigation.navigate('mytripshome', {refreshScreen: true});
        } else {
          Alert.alert('', response.message);
        }
      };
      const data = {
        deviceId: deviceId,
        tripCode: addTripContextValues.tripCode,
        referenceNumber: addTripContextValues.referenceNumber,
        selectedUserId: addTripContextValues.selectedUser.id,
      };
      AddTripToUser(data, HandleApiResponse);
    };

    const LocalValidationFailed = result => {
      setAddTripLoader(false);
      Alert.alert('', result.message);
    };

    // since the trip code,and reference number is valid and thus the add trip is show and thus user clicked
    const validationData = {
      selectedUser: addTripContextValues.selectedUser,
    };
    const addTripValidationResult = AddTripValidator(validationData);
    addTripValidationResult.status
      ? LocalValidationSuccessful()
      : LocalValidationFailed(addTripValidationResult);
  };

  return (
    <View style={cs(['flex-row'])}>
      {addTripLoader ? (
        <CustomTab>
          <ActivityIndicator color={'white'} />
        </CustomTab>
      ) : (
        <CustomTab onPress={HandleAddTrip}>
          <LocalSvgIcon name="Reply" size={Theme.FONT.SIZE_36} color="white" />
          <Text
            style={cs([
              'c-white',
              'mar-l-10',
              `f-f-${Theme.FONT._ROMAN}`,
              `f-size-${Theme.FONT.SIZE_18}`,
            ])}>
            Continue
          </Text>
        </CustomTab>
      )}
    </View>
  );
}

export default memo(AddTripFooterButton);
