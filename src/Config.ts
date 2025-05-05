const AppData = {
  ENABLE_CONSOLE: false,
  ENABLE_DISCOVER: false,
  /**
   * Used to display the place with given latitude and longitude
   */
  MAP_URL: 'https://www.google.com/maps/place/',

  /**
   * Url for the api
   * Use / in every api call
   */
  BACKEND_URL: 'https://odyssey.tigeensolutions.com/api',

  /**
   * Official odyssey website
   */
  MYODYSSEY_URL: 'https://www.myodyssey.app/',
  MYODYSSEY_TITLE: 'My odyssey', // used as the title for the webviewer in welcome component used by the Authentication modules

  /**
   * Key used to set and get the local storage data
   */
  LOCALSTORAGE_AUTHENTICATION_KEY: 'odysseyappv1authentication',
  LOCALSTORAGE_TRIP_DATA: 'odytripstripdata',
};

export default AppData;
