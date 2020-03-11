import {combineReducers} from 'redux';
import user from './getUser';
import getBudgetList from './getBudgetList';
import summary from './getExpenseSummary';
import addBudget from './addBudget';
import deleteBudget from './deleteBudget';
import getExpensesList from './getExpensesList';
import getToDoList from './getToDoList';
import createToDoList from './createToDoList';
import deleteToDoList from './deleteToDoList';
import updateToDoList from './updateToDoList';
import createToDoItem from './createToDoItem';
import deleteToDoItem from './deleteToDoItem';
import updateToDoItem from './updateToDoItem';

export default combineReducers({
  user,
  budget: combineReducers({
    getBudgetList,
    addBudget,
    deleteBudget,
    getExpensesList,
    summary,
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
});
