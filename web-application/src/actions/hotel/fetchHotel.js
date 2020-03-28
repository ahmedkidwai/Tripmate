const axios = require('axios');

export const GET_HOTEL_BEGIN = 'GET_HOTEL_BEGIN';
export const GET_HOTEL_SUCCESS = 'GET_HOTEL_SUCCESS';
export const GET_HOTEL_FAILURE = 'GET_HOTEL_FAILURE';

export const fetchHotelBegin = () => ({
  type: GET_HOTEL_BEGIN,
});

export const fetchHotelSuccess = hotel => ({
  type: GET_HOTEL_SUCCESS,
  payload: {hotel},
});

export const fetchHotelError = error => ({
  type: GET_HOTEL_FAILURE,
  payload: {error},
});

export const fetchHotel = () => {
  return dispatch => {
    dispatch(fetchHotelBegin());

    return axios
      .get('/hotel')
      .then(response => response.data)
      .then(hotel => dispatch(fetchHotelSuccess(hotel)))
      .catch(error => dispatch(fetchHotelError(error)));
  };
};

export const fetchHotelAPI = (location, adults, rooms, nights, checkIn) => {
  return dispatch => {
    dispatch(fetchHotelBegin());

    return axios
      .post('/hotel/api', {location, adults, rooms, nights, checkIn})
      .then(response => response.data)
      .then(hotel => dispatch(fetchHotelSuccess(hotel)))
      .catch(error => dispatch(fetchHotelError(error)));
  };
};
