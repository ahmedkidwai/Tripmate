import {combineReducers} from 'redux';
import user from './getUser';
import budget from './getBudgetList';

export default combineReducers({
  user,
  budget,
});
