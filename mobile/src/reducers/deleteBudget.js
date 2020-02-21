import {
  DELETE_BUDGET_BEGIN,
  DELETE_BUDGET_FAILURE,
  DELETE_BUDGET_SUCCESS,
} from '../actions/deleteBudget';
import createReducer from './createReducer';

const initialState = {
  deleteMessage: '',
  deleting: true,
  error: null,
  deleted: false,
};

const deleteBudgetBeginState = state => ({
  ...state,
  deleting: true,
  error: null,
  deleted: false,
});

const deleteBudgetSuccessState = (state, action) => ({
  ...state,
  deleting: false,
  deleteMessage: action.payload.data,
  deleted: true,
});

const deleteBudgetFailureState = (state, action) => ({
  ...state,
  deleting: false,
  error: action.payload.error,
  deleted: false,
});
const deleteBudget = createReducer(initialState, {
  [DELETE_BUDGET_BEGIN]: deleteBudgetBeginState,
  [DELETE_BUDGET_SUCCESS]: deleteBudgetSuccessState,
  [DELETE_BUDGET_FAILURE]: deleteBudgetFailureState,
});

export default deleteBudget;
