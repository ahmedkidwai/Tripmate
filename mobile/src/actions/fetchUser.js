import axios from 'axios';
import {url} from '../utils/globalVars';

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

export const fetchUser = () => {
  return dispatch => {
    dispatch(fetchUserBegin());

    return axios
      .get(url + ':5000/user')
      .then(response => response.data)
      .then(user => dispatch(fetchUserSuccess(user)))
      .catch(error => dispatch(fetchUserError(error)));
  };
};
