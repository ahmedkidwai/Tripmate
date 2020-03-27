import {combineReducers} from 'redux';
import user from './user/getUser';
import getToDoList from './todo/getToDoList';
import createToDoList from './todo/createToDoList';
import deleteToDoList from './todo/deleteToDoList';
import updateToDoList from './todo/updateToDoList';
import createToDoItem from './todo/createToDoItem';
import deleteToDoItem from './todo/deleteToDoItem';
import updateToDoItem from './todo/updateToDoItem';
import hotel from './hotel/getHotels';
import getBudget from './budget/getBudget';
import createBudget from './budget/createBudget';
import getFlight from './flight/getFlight';
import createFlight from './flight/createFlight';
import getTicket from './ticket/getTicket';
import createTicket from './ticket/createTicket';
import createEvent from './event/createEvent';
import updateEvent from './event/updateEvent';
import getEvent from './event/getEvent';
import deleteEvent from './event/deleteEvent';

import getBudgetList from './budget/getBudgetList';
import summary from './event/getExpenseSummary';
import updateExpenses from './expense/updateExpenses';
import deleteExpenses from './expense/deleteExpenses';
import updateBudget from './budget/updateBudget';
import addExpenses from './expense/addExpenses';
import getExpensesList from './event/getExpensesList';
import getExpenses from './expense/getExpenses';
import deleteBudget from './budget/deleteBudget';

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
