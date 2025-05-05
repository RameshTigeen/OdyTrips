import React, {createContext, useContext, useState} from 'react';
import {AddTripContext} from './AddTripContextProvider';

export const AddTripFormContext = createContext();
export default function AddTripFormContextProvider(props) {
  const {tripCode, referenceNumber} = useContext(AddTripContext);

  const [localTripCode, setLocalTripCode] = useState(tripCode);
  const [localReferenceNumber, setLocalReferenceNumber] =
    useState(referenceNumber);

  const formContextValue = {
    localTripCode: localTripCode,
    setLocalTripCode: setLocalTripCode,
    localReferenceNumber: localReferenceNumber,
    setLocalReferenceNumber: setLocalReferenceNumber,
  };
  return (
    <AddTripFormContext.Provider value={formContextValue}>
      {props.children}
    </AddTripFormContext.Provider>
  );
}
