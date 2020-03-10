import {combineReducers} from 'redux';
import user from './getUser';
import budget from './getBudgetList';
import todolist from './getToDoList';

export default combineReducers({
  user,
  budget,
  todolist,
});
