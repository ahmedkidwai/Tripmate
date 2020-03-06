const {expect} = require('chai');
const {describe, it} = require('mocha');
const {Budget} = require('../../models/Budget.model');
const {Expenses} = require('../../models/Budget.model');

describe('Budget Model', () => {
  it('should be invalid if budget is empty', done => {
    const budget = new Budget();

    budget.validate(err => {
      expect(err.errors.budget).to.exist;
      done();
    });
  });

  it('should be invalid if budget is less than 0', done => {
    const budget = new Budget({budget: -1});

    budget.validate(err => {
      expect(err.errors.budget).to.exist;
      done();
    });
  });

  it('should be valid if budget is at least 0', done => {
    const budget = new Budget({budget: 123});

    budget.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});

describe('Expenses Model', () => {
  it('should be invalid if name or amount is empty', done => {
    const expenses = new Expenses();

    expenses.validate(err => {
      expect(err.errors.name).to.exist;
      expect(err.errors.amount).to.exist;
      done();
    });
  });

  it('should be invalid if name is less than 1 character', done => {
    const expenses = new Expenses({name: '', amount: 123});

    expenses.validate(err => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if amount is less than 0', done => {
    const expenses = new Expenses({name: 'Test expense', amount: -1});

    expenses.validate(err => {
      expect(err.errors.amount).to.exist;
      done();
    });
  });

  it('should be valid if name is has >1 character and amount is greater than 0', done => {
    const expenses = new Expenses({name: 'Test expense', amount: 123});

    expenses.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
