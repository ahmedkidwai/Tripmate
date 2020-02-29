import {combineReducers} from 'redux';
import user from './getUser';
import todolist from './getToDoList';

export default combineReducers({
  user,
  todolist,
});
