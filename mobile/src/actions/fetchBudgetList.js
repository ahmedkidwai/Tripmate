import axios from 'axios';
import {url} from '../utils/globalVars';

export const GET_BUDGET_LIST_BEGIN = 'GET_BUDGET_BEGIN';
export const GET_BUDGET_LIST_SUCCESS = 'GET_BUDGET_SUCCESS';
export const GET_BUDGET_LIST_FAILURE = 'GET_BUDGET_FAILURE';

export const fetchBudgetListBegin = () => ({
  type: GET_BUDGET_LIST_BEGIN,
});

export const fetchBudgetListSuccess = budget => ({
  type: GET_BUDGET_LIST_SUCCESS,
  payload: {budget},
});

export const fetchBudgetListFailure = error => ({
  type: GET_BUDGET_LIST_FAILURE,
  payload: {error},
});

export const fetchBudgetList = () => {
  return dispatch => {
    dispatch(fetchBudgetListBegin());

    return axios
      .get(url + '/budget')
      .then(response => response.data)
      .then(budget => dispatch(fetchBudgetListSuccess(budget)))
      .catch(error => dispatch(fetchBudgetListFailure(error)));
  };
};
