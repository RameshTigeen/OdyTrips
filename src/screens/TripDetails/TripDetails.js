import React, {useContext, useEffect, useMemo, useState} from 'react';
import {View, Alert, ScrollView, RefreshControl} from 'react-native';

import TripDayList from './TripDayList';
import Spinner from '../../components/Spinner';
import TripTextPressable from './TripTextPressable';
import TripDetailsHeader from './TripDetailsHeader';
import MyTripsHeader from '../../components/MyTripsHeader';
import MyTripsFooter from '../../components/MyTripsFooter';

import {isValidData} from '../../utilities/Validator';
import GenerateBase64 from '../../utilities/GenerateBase64';
import {
  GetTripsDays,
  IsTripUpdated,
  UpdateTripToLocalStorageFromServer,
} from '../../utilities/Api';

import {AppContext} from '../../context/AppContextProvider';

import AppView from '../../components/AppView';
import Theme from '../../utilities/Theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppData from '../../Config';

export default function TripDetails({route, navigation}) {
  const {
    companyImageUrl,
    tripId,
    tripDetailsHeaderLabel,
    userId,
    updatedTimestamp,
  } = route.params;

  // isTripUpdated will be true only if the change in made in the server
  const [isTripUpdated, setIsTripUpdated] = useState(false);
  const [isTripUpdating, setIsTripUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tripDays, setTripDays] = useState({
    status: false,
    data: [],
  });
  const [refreshing, setRefreshing] = useState(false);

  const {cs, tripData, netInfo, setTripData, deviceId} = useContext(AppContext);

  const HandleResponse = response => {
    setTripDays(response);
    setLoading(false);
    setRefreshing(false);
    setIsTripUpdating(false);
  };

  const GetDataForTheDetailsPage = () => {
    const requestForGettingData = {
      tripId: tripId,
      tripUserId: userId,
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
        setIsTripUpdated(false);
        setIsTripUpdating(false);
        GetTripsDays(response.response, requestForGettingData, HandleResponse);
      } else {
        setLoading(false);
        setRefreshing(false);
        setIsTripUpdated(false);
        setIsTripUpdating(false);
        Alert.alert('', response.message);
      }
    };
    netInfo.isConnected
      ? UpdateTripToLocalStorageFromServer(
          requestForSettingData,
          ValidateApiResponseFromBackend,
        )
      : GetTripsDays(tripData, requestForGettingData, HandleResponse);
  };

  const GetTripUpdatedStatus = () => {
    const requestForGettingUpdatedStatus = {
      tripId: tripId,
      tripUserId: userId,
      deviceId: deviceId,
      timestamp: updatedTimestamp,
    };
    const ValidateApiResponseFromBackend = async response => {
      if (response.status) {
        response?.Isupdated ? setIsTripUpdated(true) : setIsTripUpdated(false);
      } else {
        setIsTripUpdated(false);
        Alert.alert('', response.message);
      }
    };
    netInfo.isConnected &&
      IsTripUpdated(
        requestForGettingUpdatedStatus,
        ValidateApiResponseFromBackend,
      );
  };

  useEffect(() => {
    setLoading(true);
    GetTripUpdatedStatus();
    const requestForGettingData = {
      tripId: tripId,
      tripUserId: userId,
    };
    GetTripsDays(tripData, requestForGettingData, HandleResponse);
    // GetDataForTheDetailsPage();
  }, []);

  useEffect(() => {
    if (refreshing || isTripUpdating) {
      GetDataForTheDetailsPage();
    }
  }, [refreshing, isTripUpdating]);

  const mapLink = tripDays?.url_map;
  const generalLink = tripDays?.url_general;
  const weatherLink = tripDays?.url_weather;
  const tasklink = tripDays?.url_tasks;

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

  const insets = useSafeAreaInsets();

  const briefingLabel = tripDays?.l_briefing;
  const briefingDate = tripDays?.briefing_date;
  const briefingTime = tripDays?.briefing_time;
  const briefingPhone = tripDays?.briefing_phone;
  const briefingEmail = tripDays?.briefing_email;
  const briefingAddress = tripDays?.briefing_address;
  const welcomeLabel = tripDays?.l_welcome;
  const textWelcome = tripDays?.text_welcome;
  const inclusionsLabel = tripDays?.l_inclusions;
  const textInclusions = tripDays?.text_inclusions;
  const finallyLabel = tripDays?.l_finally;
  const textFinally = tripDays?.text_finally;
  const document1Label = tripDays?.l_document1;
  const document1 = tripDays?.document1;
  const document1FileName = tripDays?.document1_file_name;
  const document2Label = tripDays?.l_document2;
  const document2 = tripDays?.document2;
  const document2FileName = tripDays?.document2_file_name;
  const documentCount =
    isValidData(document1) && isValidData(document2) ? 2 : 1;
  const isBriefingPageRequired =
    isValidData(briefingDate) ||
    isValidData(briefingTime) ||
    isValidData(briefingPhone) ||
    isValidData(briefingEmail) ||
    isValidData(briefingAddress);

  return (
    <AppView>
      <View style={cs(['flex-1'])}>
        <MyTripsHeader
          page="tripDetails"
          title={tripDetailsHeaderLabel}
          goBack={true}
          onGoBack={() => {
            navigation.goBack();
          }}
        />
        {loading ? (
          <Spinner />
        ) : (
          <>
            <View style={cs(['flex-1', 'pad-5', 'app-pbackground-color'])}>
              {tripDays.status && (
                <>
                  <TripDetailsHeader
                    isUpdated={isTripUpdated}
                    isUpdating={isTripUpdating}
                    setIsTripUpdating={setIsTripUpdating}
                    companyImageUrl={companyImageUrl}
                  />
                  <ScrollView
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                          setRefreshing(true);
                        }}
                      />
                    }>
                    {isBriefingPageRequired && (
                      <TripTextPressable
                        text={
                          isValidData(briefingLabel)
                            ? briefingLabel
                            : 'Briefing Details'
                        }
                        onPress={() => {
                          navigation.navigate('briefingdetails', {
                            briefingDetails: {
                              date: briefingDate,
                              time: briefingTime,
                              phone: briefingPhone,
                              email: briefingEmail,
                              address: briefingAddress,
                            },
                            title: isValidData(briefingLabel)
                              ? briefingLabel
                              : 'Briefing Details',
                          });
                        }}
                      />
                    )}
                    {isValidData(textWelcome) && (
                      <TripTextPressable
                        text={
                          isValidData(welcomeLabel) ? welcomeLabel : 'Welcome'
                        }
                        onPress={() => {
                          navigation.navigate('triptext', {
                            tripText: textWelcome,
                            title: isValidData(welcomeLabel)
                              ? welcomeLabel
                              : 'Welcome',
                          });
                        }}
                      />
                    )}
                    {isValidData(textInclusions) && (
                      <TripTextPressable
                        text={
                          isValidData(inclusionsLabel)
                            ? inclusionsLabel
                            : 'Inclusions'
                        }
                        onPress={() => {
                          navigation.navigate('triptext', {
                            tripText: textInclusions,
                            title: isValidData(inclusionsLabel)
                              ? inclusionsLabel
                              : 'Inclusions',
                          });
                        }}
                      />
                    )}
                    {isValidData(document1) && (
                      <TripTextPressable
                        text={
                          isValidData(document1Label)
                            ? document1Label
                            : 'Document 1'
                        }
                        onPress={() => {
                          const {
                            base64String: generatedBase64,
                            documentFormat,
                          } = GenerateBase64(document1, document1FileName);
                          navigation.navigate(
                            documentFormat === 'pdf'
                              ? 'pdfviewer'
                              : 'imageviewer',
                            {
                              title: isValidData(document1Label)
                                ? document1Label
                                : 'Document 1',
                              base64: generatedBase64,
                              documentFormat: documentFormat,
                            },
                          );
                        }}
                      />
                    )}
                    {isValidData(document2) && (
                      <TripTextPressable
                        text={
                          isValidData(document2Label)
                            ? document2Label
                            : `Document ${documentCount === 2 ? 2 : 1}`
                        }
                        onPress={() => {
                          const {
                            base64String: generatedBase64,
                            documentFormat,
                          } = GenerateBase64(document2, document2FileName);
                          navigation.navigate(
                            documentFormat === 'pdf'
                              ? 'pdfviewer'
                              : 'imageviewer',
                            {
                              title: isValidData(document2Label)
                                ? document2Label
                                : `Document ${documentCount === 2 ? 2 : 1}`,
                              base64: generatedBase64,
                              documentFormat: documentFormat,
                            },
                          );
                        }}
                      />
                    )}
                    <TripDayList
                      tripId={tripId}
                      userId={userId}
                      tripDays={tripDays}
                    />
                    {isValidData(textFinally) && (
                      <TripTextPressable
                        text={
                          isValidData(finallyLabel)
                            ? finallyLabel
                            : 'And Finally...'
                        }
                        onPress={() => {
                          navigation.navigate('triptext', {
                            tripText: textFinally,
                            title: isValidData(finallyLabel)
                              ? finallyLabel
                              : 'And Finally...',
                          });
                        }}
                      />
                    )}
                  </ScrollView>
                </>
              )}
            </View>
            <MyTripsFooter link={footerLink} />
          </>
        )}
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
