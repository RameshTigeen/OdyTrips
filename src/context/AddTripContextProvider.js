import React, {createContext, useState} from 'react';

export const AddTripContext = createContext();
export default function AddTripContextProvider(props) {
  const [tripCode, setTripCode] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [tripUsers, setTripUsers] = useState([]); // holds the array of users
  const [selectedUser, setSelectedUser] = useState({}); // only holds one object of user contains name and id
  const [addTripLoader, setAddTripLoader] = useState(false);
  const contextValue = {
    tripCode: tripCode,
    setTripCode: setTripCode,
    referenceNumber: referenceNumber,
    setReferenceNumber: setReferenceNumber,
    tripUsers: tripUsers,
    setTripUsers: setTripUsers,
    selectedUser: selectedUser,
    setSelectedUser: setSelectedUser,
    addTripLoader: addTripLoader,
    setAddTripLoader: setAddTripLoader,
  };
  return (
    <AddTripContext.Provider value={contextValue}>
      {props.children}
    </AddTripContext.Provider>
  );
}
