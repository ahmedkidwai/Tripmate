const axios = require('axios');

export const GET_USER_BEGIN = 'GET_USER_BEGIN';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const fetchUserBegin = () => ({
  type: GET_USER_BEGIN,
});

export const fetchUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  payload: {user},
});

export const fetchUserError = error => ({
  type: GET_USER_FAILURE,
  payload: {error},
});

const getUser = () => {
  return axios
    .get('/user')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const fetchUser = () => {
  return dispatch => {
    dispatch(fetchUserBegin());

    return getUser()
      .then(user => {
        dispatch(fetchUserSuccess(user));
        return user;
      })
      .catch(error => {
        dispatch(fetchUserError(error));
      });
  };
};
