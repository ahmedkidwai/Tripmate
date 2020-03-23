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
import getFlight from './getFlight';
import createFlight from './createFlight';
import getTicket from './getTicket';
import createTicket from './createTicket';
import createEvent from './createEvent';
import updateEvent from './updateEvent';
import getEvent from './getEvent';
import deleteEvent from './deleteEvent';

import getBudgetList from './getBudgetList';
import summary from './getExpenseSummary';
import updateExpenses from './updateExpenses';
import deleteExpenses from './deleteExpenses';
import updateBudget from './updateBudget';
import addExpenses from './addExpenses';
import getExpensesList from './getExpensesList';
import getExpenses from './getExpenses';
import deleteBudget from './deleteBudget';

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

  flight: combineReducers({getFlight, createFlight}),
  ticket: combineReducers({getTicket, createTicket}),
  event: combineReducers({getEvent, createEvent, updateEvent, deleteEvent}),

  budget: combineReducers({
    createBudget,
    getBudgetList,
    getBudget,
    deleteBudget,
    getExpensesList,
    deleteExpenses,
    updateBudget,
    summary,
    getExpenses,
    updateExpenses,
    addExpenses,
  }),
});
