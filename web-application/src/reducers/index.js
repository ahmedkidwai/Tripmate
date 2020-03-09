import {combineReducers} from 'redux';
import user from './getUser';
import getToDoList from './getToDoList';
import createToDoList from './createToDoList';
import deleteToDoList from './deleteToDoList';
import updateToDoList from './updateToDoList';
import createToDoItem from './createToDoItem';
import deleteToDoItem from './deleteToDoItem';
import updateToDoItem from './updateToDoItem';
import hotel from './getHotels';
import getBudget from './getBudget';
import createBudget from './createBudget';
import flight from './getFlight';
import ticket from './getTicket';

export default combineReducers({
  user,
  todolist: combineReducers({
    getToDoList,
    createToDoList,
    deleteToDoList,
    updateToDoList,
    createToDoItem,
    deleteToDoItem,
    updateToDoItem,
  }),
  hotel,
  budget: combineReducers({getBudget, createBudget}),
  flight,
  ticket,
});
