import {
  GET_BUDGET_BEGIN,
  GET_BUDGET_SUCCESS,
  GET_BUDGET_FAILURE,
} from '../actions/fetchBudget';
import createReducer from './createReducer';

const initialState = {
  budget: [],
  loading: true,
  error: null,
};

const getBudgetListBeginState = state => ({
  ...state,
  loading: true,
  error: null,
});

const getBudgetListSuccessState = (state, action) => ({
  ...state,
  loading: false,
  budget: action.payload.budget,
});

const getBudgetListFailureState = (state, action) => ({
  ...state,
  budget: [],
  loading: false,
  error: action.payload.error,
});

const getBudget = createReducer(initialState, {
  [GET_BUDGET_BEGIN]: getBudgetListBeginState,
  [GET_BUDGET_SUCCESS]: getBudgetListSuccessState,
  [GET_BUDGET_FAILURE]: getBudgetListFailureState,
});

export default getBudget;
