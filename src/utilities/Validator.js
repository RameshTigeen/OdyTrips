/**
 * check wheather the given string satifies the following
 *  The given string is
 *  * Not null
 *  * Not empty
 *  * Not undefined
 * @param {String} data
 * @returns {Boolean} true | false
 */
export function isValidData(data) {
  if (Array.isArray(data)) {
    if (data.length > 0) return true;
    else return false;
  }
  if (data !== '' && data !== undefined && data !== null) {
    return true;
  }
  return false;
}

/**
 * Used to validate the login api response
 * @param {Object} response Login api response
 * @returns status and message on the validation
 */
export function ValidateLoginResponse(response) {
  /**
   * Expected response;
   * response: {
   *  name: "some string"
   *  status: boolean
   *  token: "some token"
   *  user_id: some id(number)
   * }
   */
  if (
    response?.name !== undefined &&
    response?.name !== '' &&
    response?.token !== undefined &&
    response?.token !== '' &&
    response?.user_id !== undefined
  ) {
    return {status: true};
  } else {
    return {status: false, message: 'Got unexpected response from the server'};
  }
}

/**
 * Validation before assigning trip to user
 * @param {Object} data Holds the object selectedUser
 * @returns Status and message on validation
 */
export function AddTripValidator(data) {
  if (JSON.stringify(data.selectedUser) === '{}') {
    return {status: false, message: 'Please select the name from the list.'};
  } else {
    return {status: true};
  }
}

/**
 * Used to validate the trip code and reference number before searching for user on trip
 * @param {Object} data Holds the properties of tripCode,referenceNumber
 * @returns Status and message on validation
 */
export function ValidateSearchTrip(data) {
  if (data.tripCode === '') {
    return {status: false, message: 'Trip code should not be empty'};
  } else if (data.referenceNumber === '') {
    return {status: false, message: 'Reference number should not be empty'};
  } else {
    return {status: true};
  }
}

/**
 * Local form validation for account page
 * @param {Object} data
 * @returns {Object} {status: true||false, message: "optional"}
 */
export function ValidateAccountForm(data) {
  const {username, password} = data;
  if (username === '') {
    return {status: false, message: 'Please provide the valid Username/Email'};
  } else if (password === '') {
    return {status: false, message: 'Please provide the valid password'};
  } else {
    return {status: true};
  }
}

/**
 * Used to check wheather a given string is valid json or not
 * @param {String} str Json string to be validated
 * @returns true if valid ,if not return false
 */
export function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
