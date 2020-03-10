import {combineReducers} from 'redux';
import user from './getUser';
import getBudgetList from './getBudgetList';
import summary from './getExpenseSummary';
import addBudget from './addBudget';
import deleteBudget from './deleteBudget';
import getExpensesList from './getExpensesList';
import todolist from './getToDoList';

export default combineReducers({
  user,
  budget: combineReducers({
    getBudgetList,
    addBudget,
    deleteBudget,
    getExpensesList,
    summary,
  }),

  todolist,
});
