import axios from 'axios';

export const CREATE_EVENT_BEGIN = 'CREATE_EVENT_BEGIN';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const createEventBegin = () => ({
  type: CREATE_EVENT_BEGIN,
});

export const createEventSuccess = successMessage => ({
  type: CREATE_EVENT_SUCCESS,
  payload: {successMessage},
});

export const createEventFail = error => ({
  type: CREATE_EVENT_FAILURE,
  payload: {error},
});

export const createEvent = (
  eventTitle,
  creatorId,
  description,
  startDate,
  endDate,
  location,
  cost,
) => {
  return dispatch => {
    dispatch(createEventBegin());

    return axios
      .post('/event/add', {
        event: {
          title: eventTitle,
          creator: creatorId,
          description,
          start: startDate,
          end: endDate,
          location,
          cost,
        },
      })
      .then(response => response.data)
      .then(successMessage => dispatch(createEventSuccess(successMessage)))
      .catch(error => dispatch(createEventFail(error)));
  };
};
