const {describe, it} = require('mocha');
const {expect} = require('chai');
const {Budget, Expenses} = require('../../models/Budget.model');

const {getBudgetSummary} = require('../../Business/BugdetLogics');

describe('Budget logics ', () => {
  it('should be NaNif budget is empty', () => {
    const budget = new Budget();
    getBudgetSummary(budget).then(result => {
      expect(result.available).equal(NaN);
      expect(result.planned).equal(123);
    });
  });

  it('should be pass if budget is not empty', () => {
    const expense = new Expenses({
      name: 'Test expense',
      amount: 123,
    });
    const budget = new Budget({
      budget: 123,
      expenses: [expense],
    });
    getBudgetSummary(budget).then(result => {
      expect(result.available).equal(0);
      expect(result.planned).equal(123);
    });
  });
});
