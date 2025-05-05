import AppData from '../Config';
import {SetLocalStorage} from './FileStorage';

/**
 * Function to handle the api response based on the response status code
 * @param {Object} response Fetch api response
 * @returns Object based on the response status code
 */
function ValidateApiResponseFromBackend(response) {
  return response.json();
}

/**
 * Used to handle the error while fetching the data from the server
 * @param {Object} error error object while fetching from the server
 * @param {Function} setData  callback function to send the result
 */
function HandleErrorResponseFromBackend(error, setData) {
  const response = {
    status: false,
    message: 'Something went wrong!. Please try again.',
    type: '',
    error: error,
  };
  if (error instanceof TypeError) {
    response.type = 'TypeError';
    response.message =
      'A network error occurred. Please check your internet connection.';
  } else if (error instanceof SyntaxError) {
    response.type = 'SyntaxError';
    response.message =
      'There was a syntax error in the response from the server.';
  } else if (error instanceof RangeError) {
    response.type = 'RangeError';
    response.message = 'A range error occurred.';
  } else if (error instanceof EvalError) {
    response.type = 'EvalError';
    response.message = 'An eval error occurred.';
  } else if (error instanceof ReferenceError) {
    response.type = 'ReferenceError';
    response.message = 'A reference error occurred.';
  } else if (error instanceof URIError) {
    response.type = 'URIError';
    response.message = 'A URI error occurred.';
  } else if (error instanceof DOMException) {
    response.type = 'DOMException';
    response.message = 'A DOM exception occurred.';
  }
  setData(response);
}

/**
 * Used to store the entire server response into the local storage
 * @param {String} deviceId deviceUniqueId
 * @param {Function} setData Callback function
 */
export function UpdateLocalStorageFromServer(deviceId, setData) {
  const ValidateApiResponse = async response => {
    const result = {
      status: response?.status,
      message: response?.message,
      response: response,
    };
    if (response.status) {
      result.status = true;
      await SetLocalStorage('tripdata', response);
    }
    setData(result);
  };

  const requestData = {
    deviceId: deviceId,
  };
  GetTrips(requestData, ValidateApiResponse);
}

/**
 * Used to store the specific trip from the server into local storage
 * @param {Object} data tripData(ie.. existing data, tripId, tripUserId, deviceId)
 * @param {Function} setData Callback function
 */
export function UpdateTripToLocalStorageFromServer(data, setData) {
  const ValidateApiResponse = async response => {
    const result = {
      status: response?.status,
      message: response?.message,
      response: response,
    };
    if (response.status) {
      result.status = true;
      const ModifiedResponse = FindTheTripAndAlterWithGivenResponse(
        data,
        response,
      );
      result.response = ModifiedResponse;
      await SetLocalStorage('tripdata', ModifiedResponse);
    } else {
      result.status = false;
      result.message = 'Error occured, Please try again later';
    }
    setData(result);
  };

  const requestData = {
    tripId: data.tripId,
    deviceId: data.deviceId,
    tripUserId: data.tripUserId,
  };
  GetGivenTrip(requestData, ValidateApiResponse);
}

/**
 * Get all the initial trips(past and upcomming trips)
 * @param {Object} data deviceId
 * @param {Function} setData Callback function that respond with response
 */
export function GetTrips(data, setData) {
  var formdata = new FormData();
  formdata.append('device-id', data.deviceId);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(`${AppData.BACKEND_URL}/trips/get`, requestOptions)
    .then(ValidateApiResponseFromBackend)
    .then(result => {
      setData(result);
    })
    .catch(error => HandleErrorResponseFromBackend(error, setData));
}

/**
 *
 * @param {Object} data contains tripId, deviceId, tripUserId
 * @param {Function} setData Callback function
 */
export function GetGivenTrip(data, setData) {
  var formdata = new FormData();
  formdata.append('trip-id', data.tripId);
  formdata.append('device-id', data.deviceId);
  formdata.append('trip-user-id', data.tripUserId);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(`${AppData.BACKEND_URL}/trips/get`, requestOptions)
    .then(ValidateApiResponseFromBackend)
    .then(result => {
      setData(result);
    })
    .catch(error => HandleErrorResponseFromBackend(error, setData));
}

/**
 * Function to get all the trip users involved in a trip
 * @param {Object} data Holds the properties of userId,token,tripCode
 * @param {Function} setData Callback function to get response
 */
export function GetTripUsers(data, setData) {
  var formdata = new FormData();
  formdata.append('reference-code', data.referenceNumber);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(`${AppData.BACKEND_URL}/trips/${data.tripCode}/users`, requestOptions)
    .then(ValidateApiResponseFromBackend)
    .then(result => {
      setData(result);
    })
    .catch(error => HandleErrorResponseFromBackend(error, setData));
}

/**
 * Function used to assign a trip to an user
 * @param {Object} data Holds the properties of userId,token,tripCode
 * @param {Function} setData Callback function to get response
 */
export function AddTripToUser(data, setData) {
  var formdata = new FormData();
  formdata.append('reference-code', data.referenceNumber);
  formdata.append('user-id-selected', data.selectedUserId);
  formdata.append('device-id', data.deviceId);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(`${AppData.BACKEND_URL}/trips/${data.tripCode}/accept`, requestOptions)
    .then(ValidateApiResponseFromBackend)
    .then(result => {
      setData(result);
    })
    .catch(error => HandleErrorResponseFromBackend(error, setData));
}

/**
 * Function used to delete a trip from an user
 * @param {Object} data Holds the properties of userId,token,tripCode
 * @param {Function} setData Callback function to get response
 */
export function RemoveTripForUser(data, setData) {
  var myHeaders = new Headers();
  myHeaders.append('trip-user-id', data.userId);
  myHeaders.append('device-id', data.deviceId);
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  };
  const url = AppData.BACKEND_URL + '/trip/' + data.tripId;
  fetch(url, requestOptions)
    .then(ValidateApiResponseFromBackend)
    .then(result => {
      setData(result);
    })
    .catch(error => HandleErrorResponseFromBackend(error, setData));
}

export function IsTripUpdated(data, setData) {
  var formdata = new FormData();
  formdata.append('trip-id', data.tripId);
  formdata.append('trip-user-id', data.tripUserId);
  formdata.append('device-id', data.deviceId);
  formdata.append('timestamp', data.timestamp);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(`${AppData.BACKEND_URL}/trips/isUpdated`, requestOptions)
    .then(ValidateApiResponseFromBackend)
    .then(result => {
      setData(result);
    })
    .catch(error => HandleErrorResponseFromBackend(error, setData));
}

/*
  The following functions are responsible for getting data to the screen
  Please check wheather all the properites are included in the response if not add it
  Note: 
    The previous app just call the api for every screen change which is time consuming task and not well for implementing local storage
    Thus we call the api at initial loading to get all the trip details(refered as GetTrips Response)
    Then we can take the data for the particular screen

  *These Funtions are created to follow the previous app flow, it can be updated in the next major api change
*/

/**
 *
 * @param {Object} source GetTrips response
 * @param {Function} setData Callback to get response back
 */
export function GetTripList(source, setData) {
  const response = {
    status: true,
    data: [],
  };
  for (var i = 0; i < source?.data?.length; i++) {
    const {
      id,
      to,
      from,
      description,
      short_code,
      date_start,
      date_end,
      trip_user_id,
      reference_code,
      name,
      updated_timestamp,
      file_name,
      logo_base64,
      document1,
      document1_file_name,
      document2,
      document2_file_name,
    } = source.data[i];
    response.data.push({
      id,
      description,
      short_code,
      date_start,
      date_end,
      from,
      to,
      trip_user_id,
      reference_code,
      name,
      updated_timestamp,
      file_name,
      logo_base64,
      document1,
      document1_file_name,
      document2,
      document2_file_name,
    });
  }
  setData(response);
}

/**
 * Used to get the all the trip days of a particular trip of a particular user
 * @param {Object} tripData GetTrips response
 * @param {Object} requestData Object that contains tripId and tripUserId
 * @param {Function} SetData Callback to get the response back
 */
export function GetTripsDays(tripData, requestData, SetData) {
  const data = tripData.data.filter(item => {
    return (
      item.id === requestData.tripId &&
      item.trip_user_id === requestData.tripUserId
    );
  })[0];
  const response = {
    status: true,
    l_welcome: data?.l_welcome,
    text_welcome: data?.text_welcome,
    l_inclusions: data?.l_inclusions,
    text_inclusions: data?.text_inclusions,
    l_finally: data?.l_finally,
    text_finally: data?.text_finally,
    l_briefing: data?.l_briefing,
    briefing_date: data?.briefing_date,
    briefing_time: data?.briefing_time,
    briefing_phone: data?.briefing_phone,
    briefing_email: data?.briefing_email,
    briefing_address: data?.briefing_address,
    url_general: data?.url_general,
    url_weather: data?.url_weather,
    url_map: data?.url_map,
    l_document1: data?.l_document1,
    document1: data?.document1,
    document1_file_name: data?.document1_file_name,
    l_document2: data?.l_document2,
    document2: data?.document2,
    document2_file_name: data?.document2_file_name,
    data: [],
  };
  for (var i = 0; i < data?.itinerary?.length; i++) {
    const {id, date, from, to, file_name, image_base64} = data?.itinerary[i];
    response.data.push({id, date, from, to, file_name, image_base64});
  }
  SetData(response);
}

/**
 * Used to get the day of given trip of given user
 * @param {Object} tripData GetTrips response
 * @param {Object} requestData Object that contains tripId, userId, tripDayId
 * @param {Function} setData Callback to get the response back
 */
export function GetTripsDay(tripData, requestData, setData) {
  const trip = tripData.data.filter(item => {
    return (
      item.id === requestData.tripId && item.trip_user_id === requestData.userId
    );
  })[0];
  const itinerary = trip.itinerary.filter(
    item => item.id === requestData.tripDayId,
  )[0];

  const response = {
    status: true,
    label_end: itinerary.label_end,
    text_itinerary: itinerary.text_itinerary,
    url_weather: itinerary?.url_weather,
    url_map: itinerary?.url_map,
    // url_weather: 'https://jsonlint.com/',
    // url_map: 'https://jsonlint.com/',
    day_no: itinerary?.day_no,
    data: [],
  };

  for (
    var i = 0, itineraryLength = itinerary?.details?.length;
    i < itineraryLength;
    i++
  ) {
    const {
      id,
      type,
      base64,
      file_name,
      provider_name,
      address,
      city,
      time_check_in,
    } = itinerary.details[i];
    response.data.push({
      id,
      type,
      base64,
      file_name,
      provider_name,
      address,
      city,
      time_check_in,
    });
  }
  setData(response);
}

/**
 * Used to get activity data
 * @param {Object} tripData GetTrips response
 * @param {Object} requestData Object that contains userId, tripId,tripDayId, activityId(Represented as currentDayTimelineId)
 * @param {Function} setData Callback to get the response back
 */
export function GetTripsDayDetails(tripData, requestData, setData) {
  const trip = tripData.data.filter(item => {
    return (
      item.id === requestData.tripId && item.trip_user_id === requestData.userId
    );
  })[0];
  const itinerary = trip.itinerary.filter(
    item => item.id === requestData.tripDayId,
  )[0];
  const activity = itinerary.details.filter(
    item => item.id === requestData.currentDayTimelineId,
  )[0];
  const response = {
    status: true,
    ...activity,
  };
  setData(response);
}

/**
 * This function get all trip data and newly requested trip data and replace the old trip data with new trip data
 * @param {Object} data  GetTrips response
 * @param {Object} newServerResponse Newly reqeusted trip response
 * @returns Updated Trips
 */
function FindTheTripAndAlterWithGivenResponse(data, newServerResponse) {
  if (newServerResponse.status) {
    const existingData = data?.tripData;
    const existingTripData = existingData.data.filter(item => {
      return item.id === data?.tripId && item.trip_user_id === data.tripUserId;
    })[0];
    const dataToBeReplaced =
      newServerResponse.data.length > 0
        ? newServerResponse.data[0]
        : existingTripData;
    const modifiedTrips = existingData.data.map(item => {
      if (
        item.id === dataToBeReplaced.id &&
        item.trip_user_id === dataToBeReplaced.trip_user_id
      ) {
        return dataToBeReplaced;
      } else {
        return item;
      }
    });
    const newData = {data: modifiedTrips, status: true};
    return newData;
  } else {
    return data?.tripData;
  }
}
