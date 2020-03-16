import axios from 'axios';
import {url} from '../utils/globalVars';

export const GET_BUDGET_BEGIN = 'GET_BUDGET_BEGIN';
export const GET_BUDGET_SUCCESS = 'GET_BUDGET_SUCCESS';
export const GET_BUDGET_FAILURE = 'GET_BUDGET_FAILURE';

export const fetchBudgetBegin = () => ({
  type: GET_BUDGET_BEGIN,
});

export const fetchBudgetSuccess = budget => ({
  type: GET_BUDGET_SUCCESS,
  payload: {budget},
});

export const fetchBudgetFailure = error => ({
  type: GET_BUDGET_FAILURE,
  payload: {error},
});

export const fetchBudget = id => {
  return dispatch => {
    dispatch(fetchBudgetBegin());

    return axios
      .get(url + '/budget/' + id)
      .then(response => response.data)
      .then(budget => dispatch(fetchBudgetSuccess(budget)))
      .catch(error => dispatch(fetchBudgetFailure(error)));
  };
};
