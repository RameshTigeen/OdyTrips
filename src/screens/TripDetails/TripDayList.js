import React, {useContext} from 'react';
import {Pressable, View, Image} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import AppText from '../../components/AppText';
import LocationIndicator from '../../components/LocationIndicator';
import SplittedLocationIndicator from '../../components/SplittedLocationIndicator';

import Theme from '../../utilities/Theme';
import {isValidData} from '../../utilities/Validator';
import {DateFormatter} from '../../utilities/Formatter';
import GenerateBase64 from '../../utilities/GenerateBase64';

import {AppContext} from '../../context/AppContextProvider';

export default function TripDayList({tripId, userId, tripDays}) {
  const {cs, deviceInfo, dimensions} = useContext(AppContext);
  const navigation = useNavigation();
  return tripDays.data.map((item, index) => {
    const {base64String: dayImageUrl} = GenerateBase64(
      item?.image_base64,
      item?.file_name,
    );
    const tripDayId = item?.id;
    const tripDate = item?.date;
    const startPlace = item?.from;
    const endPlace = item?.to;
    return (
      <Pressable
        key={tripDayId}
        style={[
          cs([
            'w-100%',
            'pad-y-5',
            'pad-x-10',
            'app-sborder-color',
            'align-self-center',
          ]),
          {borderBottomWidth: 0.3},
        ]}
        onPress={() => {
          navigation.navigate('tripdaydetails', {
            index: index, // Used to get the initial day pressed by the user
            tripId: tripId,
            userId: userId,
            tripDayId: tripDayId,
            tripDays: tripDays,
          });
        }}>
        <View style={cs(['flex-1', 'flex-row'])}>
          <View style={cs(['flex-6', 'justify-content-center'])}>
            <View style={[cs(['mar-r-10'])]}>
              {isValidData(tripDate) && (
                <AppText
                  customStyle={['mar-t-10']}
                  size={Theme.FONT.SIZE_16}
                  family={Theme.FONT._ROMAN}
                  varient={'primary'}>
                  {DateFormatter(tripDate)}
                </AppText>
              )}
              {isValidData(startPlace) &&
              isValidData(endPlace) &&
              deviceInfo.largeDevice ? (
                <LocationIndicator from={startPlace} to={endPlace} />
              ) : (
                <SplittedLocationIndicator from={startPlace} to={endPlace} />
              )}
            </View>
          </View>
          <View style={cs(['flex-4', 'align-items-end'])}>
            <Image
              resizeMode="cover"
              source={{
                uri: dayImageUrl,
              }}
              style={cs([
                `w-${dimensions.width > 900 ? 70 : 100}%`,
                `h-${dimensions.width > 500 ? 120 : 75}`,
              ])}
            />
          </View>
        </View>
      </Pressable>
    );
  });
}
