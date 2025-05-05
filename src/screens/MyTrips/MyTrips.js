import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

import MyTripsList from './MyTripList';
import TripTypeHeader from './TripTypeHeader';
import AddTripMessage from './AddTripMessage';
import Spinner from '../../components/Spinner';
import MyTripsHeader from '../../components/MyTripsHeader';
import MyTripsFooter from '../../components/MyTripsFooter';

import {useBackPressHandler} from '../../hooks/useBackPressHandler';

import {SeperateTripIntoPastAndFuture} from '../../utilities/Formatter';
import {GetTripList, UpdateLocalStorageFromServer} from '../../utilities/Api';

import {AppContext} from '../../context/AppContextProvider';

import AppData from '../../Config';
import AppView from '../../components/AppView';
import CustomTab from '../../components/CustomTab';
import LocalSvgIcon from '../../utilities/SvgManager';

import Theme from '../../utilities/Theme';
import CustomTabText from '../../components/CustomTabText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function MyTrips({navigation, route}) {
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [trip, setTrip] = useState({status: false, data: []});

  const {cs, tripData, netInfo, setTripData, deviceId} = useContext(AppContext);

  const SetLocalTripData = response => {
    AppData.ENABLE_CONSOLE && console.log('I got the response ', response);
    setTrip(response);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    setLoading(true);
    GetDataFromServer();
    // GetTripList(tripData, SetLocalTripData);
  }, []);

  const GetDataFromServer = () => {
    console.log('Running');
    const ValidateLocalResponse = async response => {
      console.log('Running Validate Local Response');
      console.log('result', response);
      if (response.status) {
        setTripData(response.response);
        GetTripList(response.response, SetLocalTripData);
      } else {
        setLoading(false);
        setRefreshing(false);
      }
    };
    netInfo.isConnected
      ? UpdateLocalStorageFromServer(deviceId, ValidateLocalResponse)
      : GetTripList(tripData, SetLocalTripData);
  };

  useEffect(() => {
    if (refreshing) {
      GetDataFromServer();
    }
  }, [refreshing]);

  // Check wheather the user is from add my trip page
  // by successfully adding the trip
  const WantToRefreshTheScreen = route.params.refreshScreen;
  useFocusEffect(
    useCallback(() => {
      if (WantToRefreshTheScreen) {
        setRefreshing(true);
        navigation.setParams({refreshScreen: false});
      } else {
        AppData.ENABLE_CONSOLE &&
          console.log('The screen is in focus and thus i am fetching the data');
        // GetDataFromServer();
        setRender(prev => !prev);
      }
    }, [WantToRefreshTheScreen]),
  );
  useBackPressHandler();

  const footerLink = [
    {
      id: 'trip',
      icon: 'trip',
      text: 'Trip',
      navigateTo: 'addtrip',
    },
  ];

  const insets = useSafeAreaInsets();

  const seperatedTrip = SeperateTripIntoPastAndFuture(trip.data);
  const {pastTrips, futureTrips} = seperatedTrip;
  // Perform action to find wheather the data is available here
  const tripsAvailableToDisplay = trip.data.length !== 0;
  const pastTripsAvailableToDisplay = pastTrips.length !== 0;
  const futureTripsAvailableToDisplay = futureTrips.length !== 0;
  return (
    <AppView>
      <View style={cs(['flex-1', 'bgc-white'])}>
        <MyTripsHeader title={'My Trips'} page="home" />
        {loading ? (
          <Spinner />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                }}
              />
            }
            contentContainerStyle={{flexGrow: 1}}>
            {tripsAvailableToDisplay ? (
              <>
                {futureTripsAvailableToDisplay && (
                  <>
                    <TripTypeHeader text={'Future trips'} />
                    <MyTripsList
                      data={futureTrips}
                      setTripDeleted={setRefreshing}
                    />
                  </>
                )}
                {pastTripsAvailableToDisplay && (
                  <>
                    <TripTypeHeader text={'Past trips'} />
                    <MyTripsList
                      data={pastTrips}
                      setTripDeleted={setRefreshing}
                    />
                  </>
                )}
              </>
            ) : (
              <AddTripMessage />
            )}
          </ScrollView>
        )}
        <View style={cs(['flex-row'])}>
          {footerLink.map((item, index) => {
            return (
              <CustomTab
                key={item?.id ?? index}
                onPress={() => navigation.navigate(item.navigateTo, {})}>
                {item?.icon && (
                  <LocalSvgIcon
                    name={'Add'}
                    color={item?.textColor ?? 'white'}
                    size={Theme.FONT.SIZE_36}
                  />
                )}
                <CustomTabText text={item?.text} cs={cs} />
              </CustomTab>
            );
          })}
        </View>
      </View>
      <View
        style={{
          paddingBottom: insets.bottom,
          backgroundColor: Theme.COLOR.GREY_1,
        }}
      />
    </AppView>
  );
}
