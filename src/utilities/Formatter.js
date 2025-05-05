/**
 * Used to format the data
 * @param {String} inputDate Input Date in format of yyyy-mm-dd
 * @returns Date formated to Day,dd Mon yy (UTC format)
 */
export function DateFormatter(inputDate) {
  if (inputDate.includes('-')) {
    const dateParts = inputDate.split('-');
    const year = parseInt(dateParts[0]);

    const dateObject = new Date(inputDate);
    let formattedDate = `${dateObject.toUTCString().slice(0, 12)}${year
      .toString()
      .slice(2, 4)}`;
    return formattedDate;
  } else {
    return null;
  }
}

/**
 * Used to convert 24 hour time format to 12 hour time format
 * @param {String} time24 24 hour time seperated with ':' (20:20)
 * @returns 12 hour format (8:20 pm)
 */
export function TimeFormatter(time24) {
  if (time24.includes(':')) {
    const [hours, minutes] = time24.split(':').map(Number);

    let period = 'am';
    let formattedHours = hours;

    if (hours === 0) {
      formattedHours = 12;
    } else if (hours >= 12) {
      period = 'pm';
      if (hours > 12) {
        formattedHours = hours - 12;
      }
    }

    const formattedTime = `${formattedHours}:${minutes
      .toString()
      .padStart(2, '0')} ${period}`;
    return formattedTime;
  } else {
    return null;
  }
}

/**
 * Used to seperate the trip into past and future trip
 * @param {Object} Trips
 * @returns {Object} {pastTrips,futureTrips}
 */
export function SeperateTripIntoPastAndFuture(Trips) {
  const currentDate = new Date();
  const pastTrips = [];
  const futureTrips = [];

  Trips.forEach(trip => {
    const tripDate = trip.date_end;
    const comparedDate = new Date(tripDate);

    if (comparedDate < currentDate) {
      pastTrips.push(trip);
    } else {
      futureTrips.push(trip);
    }
  });

  return {
    pastTrips,
    futureTrips,
  };
}
