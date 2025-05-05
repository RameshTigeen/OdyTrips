import React, {useContext, useRef} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';

import SubmitButton from './SearchUser';
import EnterTripCode from './EnterTripCode';
import SelectUserDropdown from './SelectUserDropdown';
import AddTripHeadingLabel from './AddTripHeadingLabel';
import AddTripFooterButton from './AddTripFooterButton';
import EnterReferenceNumber from './EnterReferenceNumber';
import MyTripsHeader from '../../components/MyTripsHeader';

import {AppContext} from '../../context/AppContextProvider';
import AddTripContextProvider, {
  AddTripContext,
} from '../../context/AddTripContextProvider';
import AddTripFormContextProvider from '../../context/AddTripFormContextProvider';
import AppView from '../../components/AppView';
import Theme from '../../utilities/Theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function AddTrip(props) {
  const {navigation} = props;
  const insets = useSafeAreaInsets();

  const tripCodeRef = useRef(null);
  const referenceCodeRef = useRef(null);
  const submitted = () => {
    tripCodeRef.current.blur();
    referenceCodeRef.current.blur();
  };
  return (
    <AppView>
      <AddTripContextProvider>
        <MyTripsHeader
          title={'Add My Trip'}
          goBack
          onGoBack={() => {
            navigation.goBack();
          }}
        />
        <MyTripBody>
          <AddTripHeadingLabel />
          <EnterTripCode
            ref={tripCodeRef}
            goToReferenceInput={() => {
              referenceCodeRef.current.focus();
            }}
          />
          <EnterReferenceNumber ref={referenceCodeRef} />
          <SubmitButton submitted={submitted} />
          <AddTripContext.Consumer>
            {contextData => {
              const TripUserAvailable = contextData.tripUsers.length > 0;
              return <>{TripUserAvailable && <SelectUserDropdown />}</>;
            }}
          </AddTripContext.Consumer>
        </MyTripBody>
        <AddTripContext.Consumer>
          {contextData => {
            const TripUserAvailable = contextData.tripUsers.length > 0;
            return (
              <>
                {TripUserAvailable && (
                  <AddTripFooterButton RemoveFocus={submitted} />
                )}
              </>
            );
          }}
        </AddTripContext.Consumer>
      </AddTripContextProvider>
      <View
        style={{
          paddingBottom: insets.bottom,
          backgroundColor: Theme.COLOR.GREY_1,
        }}
      />
    </AppView>
  );
}

function MyTripBody(props) {
  const {cs} = useContext(AppContext);
  return (
    <View style={cs(['flex-1', 'app-pbackground-color'])}>
      <KeyboardAvoidingView
        style={cs(['flex-1'])}
        behavior={Platform.OS === 'ios' && 'padding'}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <AddTripFormContextProvider>
            {props.children}
          </AddTripFormContextProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
