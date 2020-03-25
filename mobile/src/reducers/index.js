import {combineReducers} from 'redux';
import user from './getUser';
import getBudgetList from './getBudgetList';
import getBudget from './getBudget';
import summary from './getExpenseSummary';
import addBudget from './addBudget';
import deleteBudget from './deleteBudget';
import getExpensesList from './getExpensesList';
import getExpenses from './getExpenses';
import updateExpenses from './updateExpenses';
import deleteExpenses from './deleteExpenses';
import getToDoList from './getToDoList';
import createToDoList from './createToDoList';
import deleteToDoList from './deleteToDoList';
import updateToDoList from './updateToDoList';
import createToDoItem from './createToDoItem';
import deleteToDoItem from './deleteToDoItem';
import updateToDoItem from './updateToDoItem';
import updateBudget from './updateBudget';
import addExpenses from './addExpenses';
import getTicket from './getTicket';
import getFlight from './getFlight';
import createEvent from './createEvent';
import updateEvent from './updateEvent';
import getEvent from './getEvent';
import deleteEvent from './deleteEvent';

export default combineReducers({
  user,
  budget: combineReducers({
    getBudgetList,
    getBudget,
    addBudget,
    deleteBudget,
    getExpensesList,
    deleteExpenses,
    updateBudget,
    summary,
    getExpenses,
    updateExpenses,
    addExpenses,
  }),

  todolist: combineReducers({
    getToDoList,
    createToDoList,
    deleteToDoList,
    updateToDoList,
  }),

  todoitem: combineReducers({
    createToDoItem,
    deleteToDoItem,
    updateToDoItem,
  }),

  ticket: combineReducers({
    getTicket,
  }),

  flight: combineReducers({
    getFlight,
  }),
  event: combineReducers({
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
  }),
});
