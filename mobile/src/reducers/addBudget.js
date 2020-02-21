import {
  ADD_BUDGET_BEGIN,
  ADD_BUDGET_FAILURE,
  ADD_BUDGET_SUCCESS,
} from '../actions/addBudget';
import createReducer from './createReducer';
const initialState = {
  successMessage: '',
  uploading: true,
  error: null,
  uploaded: false,
};

const addBudgetBeginState = state => ({
  ...state,
  uploading: true,
  error: null,
  uploaded: false,
});

const addBudgetSuccessState = (state, action) => ({
  ...state,
  uploading: false,
  successMessage: action.payload.data,
  uploaded: true,
});

const addBudgetFailureState = (state, action) => ({
  ...state,
  uploading: false,
  error: action.payload.error,
  uploaded: false,
});
const addBudget = createReducer(initialState, {
  [ADD_BUDGET_BEGIN]: addBudgetBeginState,
  [ADD_BUDGET_SUCCESS]: addBudgetSuccessState,
  [ADD_BUDGET_FAILURE]: addBudgetFailureState,
});

export default addBudget;
