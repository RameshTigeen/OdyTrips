import React, {memo, useContext, useState} from 'react';
import {Alert, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {AppContext} from '../../context/AppContextProvider';
import {AddTripContext} from '../../context/AddTripContextProvider';
import {AddTripFormContext} from '../../context/AddTripFormContextProvider';

import SearchButton from './SearchButton';

import {GetTripUsers} from '../../utilities/Api';
import {ValidateSearchTrip} from '../../utilities/Validator';
import AppText from '../../components/AppText';
import Theme from '../../utilities/Theme';
import AppData from '../../Config';

function SubmitButton(props) {
  const {submitted} = props;
  const navigation = useNavigation();
  const [searchTripLoader, setSearchTripLoader] = useState(false);
  const [tripDetailsValid, setTripDetailsValid] = useState(true);

  const {cs} = useContext(AppContext);
  const {localReferenceNumber, localTripCode} = useContext(AddTripFormContext);
  const {setTripCode, setReferenceNumber, setTripUsers, setSelectedUser} =
    useContext(AddTripContext);

  const searchTrip = () => {
    setSearchTripLoader(true);
    const ValidationSuccess = () => {
      const SetTripUser = response => {
        setSearchTripLoader(false);
        setSelectedUser({});
        if (response.status) {
          setTripDetailsValid(true);
          setTripCode(localTripCode);
          setReferenceNumber(localReferenceNumber);
          setTripUsers(response.data);
        } else {
          setTripDetailsValid(false);
          setTripUsers([]);

          Alert.alert('', response.message);
        }
      };

      const requestData = {
        tripCode: localTripCode,
        referenceNumber: localReferenceNumber,
      };
      GetTripUsers(requestData, SetTripUser);
    };

    const ValidationFailed = () => {
      setTripDetailsValid(false);
      setSearchTripLoader(false);
      setTripUsers([]);
      setSelectedUser({});
    };

    const formData = {
      tripCode: localTripCode,
      referenceNumber: localReferenceNumber,
    };
    const validationResult = ValidateSearchTrip(formData);
    validationResult.status ? ValidationSuccess() : ValidationFailed();
  };

  return (
    <View
      style={cs([
        'w-100%',
        'mar-b-5',
        'align-items-center',
        'justify-content-center',
      ])}>
      <SearchButton
        loading={searchTripLoader}
        onPress={() => {
          submitted();
          searchTrip();
        }}
      />
      {!tripDetailsValid && (
        <View style={cs(['w-80%', 'mar-y-10'])}>
          <AppText
            size={Theme.FONT.SIZE_18}
            customStyle={['text-align-center']}
            family={Theme.FONT._ROMAN}
            varient={'primary'}>
            Please enter the valid trip code and reference number
          </AppText>
        </View>
      )}
    </View>
  );
}

export default memo(SubmitButton);
