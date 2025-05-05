import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, Alert, RefreshControl} from 'react-native';

import TripStopBody from './TripStopBody';
import TripStopHeader from './TripStopHeader';
import Spinner from '../../components/Spinner';
import MyTripsHeader from '../../components/MyTripsHeader';
import MyTripsFooter from '../../components/MyTripsFooter';

import {DateFormatter} from '../../utilities/Formatter';
import {
  GetTripsDayDetails,
  UpdateTripToLocalStorageFromServer,
} from '../../utilities/Api';

import {AppContext} from '../../context/AppContextProvider';
import {isValidData} from '../../utilities/Validator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Theme from '../../utilities/Theme';

export default function StopDetails({navigation, route}) {
  const {
    date,
    tripId,
    userId,
    tripDayId,
    tripActivityId,
    urlGeneral,
    urlTasks,
  } = route.params;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({status: false});
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  const {cs, tripData, netInfo, setTripData, deviceId} = useContext(AppContext);
  const SetResponseData = response => {
    setData(response);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    setLoading(true);

    const requestData = {
      userId: userId,
      tripId: tripId,
      tripDayId: tripDayId,
      currentDayTimelineId: tripActivityId,
    };
    GetTripsDayDetails(tripData, requestData, SetResponseData);
  }, []);

  useEffect(() => {
    const requestForGettingData = {
      userId: userId,
      tripId: tripId,
      tripDayId: tripDayId,
      currentDayTimelineId: tripActivityId,
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
        GetTripsDayDetails(
          response.response,
          requestForGettingData,
          SetResponseData,
        );
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
        : GetTripsDayDetails(tripData, requestForGettingData, SetResponseData);
    }
  }, [refreshing]);

  const footerLink = React.useMemo(() => {
    const links = [];
    isValidData(urlGeneral) &&
      links.push({
        id: 'general',
        icon: 'general',
        url: urlGeneral,
        text: 'General',
        textHidden: true,
      });
    isValidData(urlTasks) &&
      links.push({
        id: 'tasks',
        icon: 'tasks',
        url: urlTasks,
        text: 'Tasks',
        textHidden: true,
      });
    isValidData(data?.website) &&
      links.push({
        id: 'website',
        text: 'Website',
        url: data?.website,
        textHidden: true,
        icon: 'website',
      });
    return links;
  }, [urlGeneral, urlTasks, data?.website]);

  return (
    <>
      <MyTripsHeader
        title={DateFormatter(date)}
        goBack
        onGoBack={() => {
          navigation.goBack();
        }}
        page="tripSpotDetails"
      />
      {loading ? (
        <Spinner />
      ) : (
        data.status && (
          <View style={cs(['flex-1'])}>
            <ScrollView
              style={cs(['app-pbackground-color'])}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => setRefreshing(true)}
                />
              }>
              <TripStopHeader timeline={data} />
              <TripStopBody details={data} />
            </ScrollView>
          </View>
        )
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
