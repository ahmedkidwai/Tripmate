import axios from 'axios';
import {url} from '../utils/globalVars';

export const CREATE_FLIGHT_BEGIN = 'CREATE_FLIGHT_BEGIN';
export const CREATE_FLIGHT_SUCCESS = 'CREATE_FLIGHT_SUCCESS';
export const CREATE_FLIGHT_FAILURE = 'CREATE_FLIGHT_FAILURE';

export const createFlightBegin = () => ({
  type: CREATE_FLIGHT_BEGIN,
});

export const createFlightSuccess = successMessage => ({
  type: CREATE_FLIGHT_SUCCESS,
  payload: {successMessage},
});

export const createFlightFail = error => ({
  type: CREATE_FLIGHT_FAILURE,
  payload: {error},
});

export const createFlightManually = (
  departureCity,
  departureCountry,
  departureAirport,
  departureGate,
  departureTime,
  arrivalCity,
  arrivalCountry,
  arrivalAirport,
  arrivalGate,
  arrivalTime,
  flightNumber,
  flightDate,
  airline,
) => {
  return dispatch => {
    dispatch(createFlightBegin());

    return axios
      .post(url + '/flight/add_manual', {
        departure: {
          airport: {
            name: departureAirport,
            municipalityName: departureCity,
            countryCode: departureCountry,
          },
          scheduledTimeLocal: departureTime,
          gate: departureGate,
        },
        arrival: {
          airport: {
            name: arrivalAirport,
            municipalityName: arrivalCity,
            countryCode: arrivalCountry,
          },
          scheduledTimeLocal: arrivalTime,
          gate: arrivalGate,
        },
        number: flightNumber,
        date: flightDate,
        airline,
      })
      .then(response => response.data)
      .then(successMessage => dispatch(createFlightSuccess(successMessage)))
      .catch(error => dispatch(createFlightFail(error)));
  };
};

export const createFlightAutomatically = (number, date) => {
  return dispatch => {
    dispatch(createFlightBegin());

    return axios
      .post(url + '/flight/add_api', {number, date})
      .then(response => response.data)
      .then(successMessage => dispatch(createFlightSuccess(successMessage)))
      .catch(error => dispatch(createFlightFail(error)));
  };
};
