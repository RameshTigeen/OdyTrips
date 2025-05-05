import React, {memo, useContext, useState} from 'react';
import {ActivityIndicator, Alert, Pressable} from 'react-native';

import {Swipeable} from 'react-native-gesture-handler';

import Theme from '../../utilities/Theme';
import LocalSvgIcon from '../../utilities/SvgManager';
import {RemoveTripForUser} from '../../utilities/Api';

import {AppContext} from '../../context/AppContextProvider';

function SwipeLeftToDelete({children, setTripDeleted, tripId, tripUserId}) {
  const {cs, deviceId, netInfo} = useContext(AppContext);
  const [deleting, setDeleting] = useState(false);

  const SetData = response => {
    setDeleting(false);
    if (response.status) {
      setTripDeleted(true);
    } else {
      Alert.alert('', response.message);
    }
  };

  const DeleteTrip = () => {
    const SendRequestToServer = () => {
      setDeleting(true);
      const data = {
        tripId: tripId,
        userId: tripUserId,
        deviceId: deviceId,
      };
      RemoveTripForUser(data, SetData);
    };

    const AskUserSendRequestToServer = () => {
      Alert.alert('Confirmation', 'Are you sure want to delete this trip?', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: SendRequestToServer,
          style: 'default',
        },
      ]);
    };

    const AlertUserToGoOnline = () => {
      Alert.alert("You're offline", 'Deletion cannot be performed now');
    };

    netInfo.isConnected ? AskUserSendRequestToServer() : AlertUserToGoOnline();
  };

  const DeleteButton = () => {
    return (
      <Pressable
        onPress={DeleteTrip}
        style={cs([
          'w-130',
          'bgc-red',
          'align-items-center',
          'justify-content-center',
        ])}>
        {deleting ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <LocalSvgIcon name="Trash" color="white" size={Theme.FONT.SIZE_18} />
        )}
      </Pressable>
    );
  };

  return (
    <Swipeable renderRightActions={DeleteButton} rightThreshold={130}>
      {children}
    </Swipeable>
  );
}

export default memo(SwipeLeftToDelete);
