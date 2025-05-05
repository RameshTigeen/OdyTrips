import React, {useContext} from 'react';
import {View, Pressable, Image} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import AppText from '../../components/AppText';
import DateIndicator from '../../components/DateIndicator';
import LocationIndicator from '../../components/LocationIndicator';

import Theme from '../../utilities/Theme';
import LocalSvgIcon from '../../utilities/SvgManager';
import {isValidData} from '../../utilities/Validator';
import {DateFormatter} from '../../utilities/Formatter';
import GenerateBase64 from '../../utilities/GenerateBase64';

import {AppContext} from '../../context/AppContextProvider';
import useImageDimension from '../../hooks/useImageDimension';

const TripDetailsRenderer = props => {
  const {index, item} = props;

  const navigation = useNavigation();
  const {cs, deviceInfo} = useContext(AppContext);

  const tripId = item.id;
  const tripName = item.description;
  const startDate = DateFormatter(item.date_start);
  const endDate = DateFormatter(item.date_end);
  const startPlace = item.from;
  const endPlace = item.to;
  const acceptedUserName = item.name;
  const tripCode = item.short_code;
  const fileName = item.file_name;
  const {base64String: companyImageUrl} = GenerateBase64(
    item.logo_base64,
    fileName,
  );
  const userId = item.trip_user_id;
  const referenceNumber = item.reference_code;
  const updatedTimestamp = isValidData(item?.updated_timestamp)
    ? item?.updated_timestamp
    : '';

  const imageDimension = useImageDimension(companyImageUrl);

  const Row1 = () => {
    return (
      <View
        style={cs(['flex-row', 'align-items-end', 'justify-content-between'])}>
        <Image
          resizeMode="contain"
          source={{uri: companyImageUrl}}
          style={[
            cs([`h-${deviceInfo.largeDevice ? '55' : '35'}`]),
            imageDimension?.status
              ? {aspectRatio: imageDimension?.aspectRatio}
              : {aspectRatio: 2},
          ]}
        />
        <View>
          {isValidData(tripCode) && (
            <AppText
              family={Theme.FONT._HEAVY}
              customStyle={['mar-y-5', 'text-align-center']}
              varient="primary">
              {tripCode}
            </AppText>
          )}
        </View>
      </View>
    );
  };
  const Row2 = () => {
    return (
      <View style={cs(['flex-row', 'align-items-end'])}>
        <View style={cs(['w-100%'])}>
          {isValidData(tripName) && (
            <AppText
              customStyle={['pad-y-5', 'f-w-bold']}
              family={Theme.FONT._HEAVY}
              size={Theme.FONT.SIZE_18}>
              {tripName}
            </AppText>
          )}
        </View>
      </View>
    );
  };
  const Row3 = () => {
    return (
      <View>
        {isValidData(startDate) && isValidData(endDate) && (
          <DateIndicator startDate={startDate} endDate={endDate} />
        )}
      </View>
    );
  };
  const Row4 = () => {
    return (
      <View
        style={cs([
          'flex-row',
          'align-items-center',
          'justify-content-between',
        ])}>
        {isValidData(startPlace) && isValidData(endPlace) && (
          <LocationIndicator from={startPlace} to={endPlace} style="bold" />
        )}
      </View>
    );
  };

  const Row5 = () => {
    return (
      <View style={cs(['flex-row', 'align-items-center'])}>
        {isValidData(acceptedUserName) && (
          <View style={cs(['flex-row', 'align-items-center', 'w-50%'])}>
            <LocalSvgIcon
              name="User"
              size={Theme.FONT.SIZE_18}
              color={Theme.COLOR.GREY_2}
            />
            <AppText customStyle={['pad-l-10', 'pad-y-5']}>
              {acceptedUserName}
            </AppText>
          </View>
        )}
        {isValidData(referenceNumber) && (
          <View style={cs(['w-50%'])}>
            <AppText varient="primary">{referenceNumber}</AppText>
          </View>
        )}
      </View>
    );
  };

  return (
    <Pressable
      key={item?.id + item?.trip_user_id}
      onPress={() => {
        navigation.navigate('tripdetails', {
          tripId: tripId,
          userId: userId,
          tripDetailsHeaderLabel: tripName,
          companyImageUrl: companyImageUrl,
          updatedTimestamp: updatedTimestamp,
        });
      }}
      style={[
        cs(['app-sborder-color', 'pad-5', 'app-pbackground-color', 'pad-x-40']),
        index % 2 === 1 && cs([`bgc-${Theme.COLOR.GREY_7}`]),
        {borderBottomWidth: 1},
      ]}>
      <Row1 />
      <Row2 />
      <Row3 />
      <Row4 />
      <Row5 />
    </Pressable>
  );
};

export default TripDetailsRenderer;
