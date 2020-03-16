import {
  GET_BUDGET_BEGIN,
  GET_BUDGET_SUCCESS,
  GET_BUDGET_FAILURE,
} from '../actions/fetchBudget';

import createReducer from './createReducer';
const initialState = {
  budget: {},
  loading: true,
  error: null,
};

const getBudgetBeginState = state => ({
  ...state,
  loading: true,
  error: null,
});

const getBudgetSuccessState = (state, action) => ({
  ...state,
  loading: false,
  budget: action.payload.budget,
});

const getBudgetFailureState = (state, action) => ({
  ...state,
  budget: {},
  loading: false,
  error: action.payload.error,
});
const getBudget = createReducer(initialState, {
  [GET_BUDGET_BEGIN]: getBudgetBeginState,
  [GET_BUDGET_SUCCESS]: getBudgetSuccessState,
  [GET_BUDGET_FAILURE]: getBudgetFailureState,
});

export default getBudget;
