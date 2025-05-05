import {useContext} from 'react';
import {View, Image, Pressable, ActivityIndicator, Alert} from 'react-native';

import {AppContext} from '../../context/AppContextProvider';
import AppText from '../../components/AppText';
import Theme from '../../utilities/Theme';

export default function TripDetailsHeader({
  companyImageUrl,
  isUpdated,
  isUpdating,
  setIsTripUpdating,
}) {
  const {cs, netInfo} = useContext(AppContext);
  const RefreshButtonPressed = () => {
    netInfo.isConnected
      ? setIsTripUpdating(true)
      : Alert.alert('', 'Please check your internet connection and try again.');
  };
  return (
    <View
      style={[
        cs([
          'pad-x-10',
          'flex-row',
          'justify-content-between',
          'app-sborder-color',
          'align-items-center',
          'pad-b-5',
        ]),
        {borderBottomWidth: 1},
      ]}>
      <View style={cs(['flex-6'])}>
        {isUpdated && (
          <Pressable
            onPress={RefreshButtonPressed}
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Theme.COLOR.ORANGE,
              borderRadius: 10,
              width: 80,
              height: 40,
            }}>
            {isUpdating ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <AppText customStyle={['c-white']} size={Theme.FONT.SIZE_20}>
                {isUpdating ? 'Refreshing' : 'Refresh'}
              </AppText>
            )}
          </Pressable>
        )}
      </View>
      <View style={cs(['flex-4', 'align-items-end'])}>
        <Image
          resizeMode="contain"
          style={cs(['h-40', 'w-100%'])}
          source={{uri: companyImageUrl}}
        />
      </View>
    </View>
  );
}
