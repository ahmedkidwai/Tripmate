import {combineReducers} from 'redux';
import user from './getUser';
import todolist from './getToDoList';
import hotel from './getHotels';
import getBudget from './getBudget';
import createBudget from './createBudget';
import flight from './getFlight';
import ticket from './getTicket';

export default combineReducers({
  user,
  todolist,
  hotel,
  budget: combineReducers({getBudget, createBudget}),
  flight,
  ticket,
});
