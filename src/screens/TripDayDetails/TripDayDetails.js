import React, {useContext, useEffect, useMemo, useState} from 'react';
import {View, Image, RefreshControl, ScrollView, Alert} from 'react-native';

import TripStop from './TripStop';
import DayChanger from './DayChanger';
import AppText from '../../components/AppText';
import Spinner from '../../components/Spinner';
import MyTripsHeader from '../../components/MyTripsHeader';
import MyTripsFooter from '../../components/MyTripsFooter';
import LocationIndicator from '../../components/LocationIndicator';
import SplittedLocationIndicator from '../../components/SplittedLocationIndicator';

import {AppContext} from '../../context/AppContextProvider';

import Theme from '../../utilities/Theme';
import {isValidData} from '../../utilities/Validator';
import {DateFormatter} from '../../utilities/Formatter';
import GenerateBase64 from '../../utilities/GenerateBase64';
import {
  GetTripsDay,
  UpdateTripToLocalStorageFromServer,
} from '../../utilities/Api';
import useImageDimension from '../../hooks/useImageDimension';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppData from '../../Config';

export default function TripDayDetails(props) {
  const {navigation, route} = props;
  const {index, tripId, userId, tripDays} = route.params;

  const [page, setPage] = useState(index);
  const [tripDay, setTripDay] = useState({status: false, data: []});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const {cs, dimensions, tripData, setTripData, netInfo, deviceId, deviceInfo} =
    useContext(AppContext);

  const currentDayTrip = tripDays.data[page];
  const tripDaysCount = tripDays?.data?.length;
  const tripDayId = currentDayTrip?.id;

  const {base64String: dayImageUrl} = GenerateBase64(
    currentDayTrip?.image_base64,
    currentDayTrip?.file_name,
  );

  // const mapLink = tripDay?.url_map;
  const mapLink = tripDay?.url_map;
  const generalLink = tripDays?.url_general;
  const weatherLink = tripDay?.url_weather;
  const tasklink = tripDays?.url_tasks;

  console.log({tripDays, tripDay});

  const footerLink = useMemo(() => {
    const links = [];
    isValidData(generalLink) &&
      links.push({
        id: 'general',
        icon: 'general',
        url: generalLink,
        text: 'General',
        textHidden: true,
      });
    isValidData(weatherLink) &&
      links.push({
        id: 'weather',
        icon: 'weather',
        url: weatherLink,
        text: 'Weather',
        textHidden: true,
      });
    isValidData(mapLink) &&
      links.push({
        id: 'maps', // should be maps. used to check in webviewer to redirect to the app
        url: mapLink,
        text: 'Maps',
        icon: 'maps',
        textHidden: true,
      });

    AppData.ENABLE_DISCOVER &&
      links.push({
        id: 'discover',
        icon: 'discover',
        url: 'Discover',
        text: 'Discover',
        textHidden: true,
        navigateTo: 'routes',
      });

    isValidData(tasklink) &&
      links.push({
        id: 'tasks',
        icon: 'tasks',
        url: tasklink,
        text: 'Tasks',
        textHidden: true,
      });
    return links;
  }, [mapLink, generalLink, weatherLink]);

  console.log(footerLink);
  const insets = useSafeAreaInsets();
  const SetResponseData = response => {
    setTripDay(response);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    setLoading(true);
    const requestData = {
      tripId: tripId,
      userId: userId,
      tripDayId: tripDayId,
    };
    GetTripsDay(tripData, requestData, SetResponseData);
  }, [tripDayId]);

  useEffect(() => {
    const requestForGettingData = {
      tripId: tripId,
      userId: userId,
      tripDayId: tripDayId,
    };
    const requestForSettingData = {
      tripId: tripId,
      tripData: tripData,
      tripUserId: userId,
      deviceId: deviceId,
    };
    const ValidateApiResponseFromBackend = async response => {
      if (response.status) {
        setTripData(response.response);
        GetTripsDay(response.response, requestForGettingData, SetResponseData);
      } else {
        Alert.alert('', response.message);
        setLoading(false);
        setRefreshing(false);
      }
    };
    if (refreshing) {
      netInfo.isConnected
        ? UpdateTripToLocalStorageFromServer(
            requestForSettingData,
            ValidateApiResponseFromBackend,
          )
        : GetTripsDay(tripData, requestForGettingData, SetResponseData);
    }
  }, [refreshing]);

  const currentDateTitle = currentDayTrip?.date;
  const startPlace = currentDayTrip?.from;
  const endPlace = currentDayTrip?.to;
  const textItinerary = tripDay?.text_itinerary;
  const labelEnd = tripDay?.label_end;
  const dayNumber = tripDay?.day_no;
  const imageDimension = useImageDimension(dayImageUrl);
  return (
    <>
      <MyTripsHeader
        goBack
        title={DateFormatter(currentDateTitle)}
        onGoBack={() => {
          navigation.goBack();
        }}
        page="tripDayDetails"
      />
      {loading ? (
        <Spinner />
      ) : (
        <View style={cs(['flex-1', 'app-pbackground-color'])}>
          <View
            style={[
              cs([
                'pad-x-15',
                'pad-y-10',
                'flex-row',
                'app-sborder-color',
                'align-items-center',
              ]),
              {borderBottomWidth: 1},
            ]}>
            <View
              style={cs([
                // `w-${deviceInfo.largeDevice ? '82' : '73'}%`,
                // 'pad-r-15',
                // 'pad-l-5',
                'flex-8',
              ])}>
              {isValidData(endPlace) &&
                isValidData(startPlace) &&
                (dimensions.width < 600 ? (
                  <SplittedLocationIndicator
                    to={endPlace}
                    from={startPlace}
                    fontSize={Theme.FONT.SIZE_14}
                  />
                ) : (
                  <LocationIndicator
                    to={endPlace}
                    from={startPlace}
                    fontSize={Theme.FONT.SIZE_14}
                  />
                ))}
            </View>
            <View style={cs(['align-items-end', 'flex-2'])}>
              <DayChanger
                day={isValidData(dayNumber) ? dayNumber : page + 1}
                previousDay={page !== 0}
                onPressPreviousDay={
                  page === 0
                    ? () => {}
                    : () => {
                        setLoading(true);
                        setPage(prev => prev - 1);
                      }
                }
                nextDay={page !== tripDaysCount - 1}
                onPressNextDay={
                  page === tripDaysCount - 1
                    ? () => {}
                    : () => {
                        setLoading(true);
                        setPage(prev => prev + 1);
                      }
                }
              />
            </View>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
              />
            }>
            <View style={[cs(['app-sborder-color']), {borderBottomWidth: 1}]}>
              {tripDay.data.map((item, index) => (
                <TripStop
                  key={item?.id}
                  time={item?.time_check_in}
                  type={item?.type}
                  base64={item?.base64}
                  fileName={item?.file_name}
                  title={item?.provider_name}
                  address={item?.address}
                  city={item?.city}
                  link={item?.link}
                  onPress={() => {
                    navigation.navigate('stopdetails', {
                      date: currentDateTitle,
                      tripId: tripId,
                      userId: userId,
                      link: item?.link,
                      tripDayId: tripDayId,
                      tripActivityId: item?.id,
                      urlTasks: tasklink,
                      urlGeneral: generalLink,
                    });
                  }}
                />
              ))}
            </View>
            <View style={cs(['mar-x-15', 'app-pbackground-color'])}>
              {isValidData(labelEnd) && (
                <AppText
                  customStyle={['mar-y-10']}
                  varient={'primary'}
                  family={Theme.FONT._HEAVY}
                  size={Theme.FONT.SIZE_18}>
                  {labelEnd}
                </AppText>
              )}
              {isValidData(dayImageUrl) && (
                <Image
                  source={{uri: dayImageUrl}}
                  resizeMode={'cover'}
                  style={[
                    imageDimension.status
                      ? {aspectRatio: imageDimension.aspectRatio, width: '100%'}
                      : [cs(['w-100%']), {aspectRatio: 1}],
                  ]}
                />
              )}
              {isValidData(textItinerary) && (
                <AppText
                  customStyle={['pad-5', 'pad-y-10']}
                  size={Theme.FONT.SIZE_16}>
                  {textItinerary.replace(/\r|¶/g, '\n')}
                </AppText>
              )}
            </View>
          </ScrollView>
        </View>
      )}
      <MyTripsFooter link={footerLink} />
      <View
        style={{
          paddingBottom: insets.bottom,
          backgroundColor: Theme.COLOR.GREY_1,
        }}
      />
    </>
  );
}
