import {combineReducers} from 'redux';
import user from './getUser';
import todolist from './getToDoList';
import hotel from './getHotels';

export default combineReducers({
  user,
  todolist,
  hotel,
});
