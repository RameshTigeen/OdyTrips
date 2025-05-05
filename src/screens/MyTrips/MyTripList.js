import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SwipeLeftToDelete from './SwipeLeftToDelete';
import TripDetailsRenderer from './TripDetailsRenderer';

/**
 *
 * @param {Object} props MyTripsList props
 * @param {Object} navigation Navigation object provided for the component that renders this component
 * @param {Object} data Data to be rendered provided by the api
 * @param {Object} company Company object that has the company details provided by api
 * @returns
 */
export default function MyTripsList(props) {
  const {data, setTripDeleted} = props;

  return (
    <GestureHandlerRootView>
      {data.map((item, index) => (
        <SwipeLeftToDelete
          key={item?.id + item?.trip_user_id}
          tripId={item?.id}
          tripUserId={item?.trip_user_id}
          setTripDeleted={setTripDeleted}>
          <TripDetailsRenderer index={index} item={item} />
        </SwipeLeftToDelete>
      ))}
    </GestureHandlerRootView>
  );
}
