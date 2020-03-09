process.env.NODE_ENV = 'test';

const {describe, it, before, after} = require('mocha');
const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const {testURI} = require('../testURI');
const server = require('../../server');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

const {Budget} = require('../../models/Budget.model');
const {Expenses} = require('../../models/Budget.model');

chai.use(chaiHttp);

describe('budget routes', () => {
  before(async done => {
    mongoose.connect(testURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    Budget.remove({});
    done();
  });

  after(async () => {
    await Budget.deleteMany({});
    await Expenses.deleteMany({});
    await mongoose.disconnect();
  });

  it('/ should get all budgets', done => {
    chai
      .request(server)
      .get('/budget')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('/ add should add a new budget', done => {
    chai
      .request(server)
      .post('/budget/add')
      .send({budget: 123})
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.eql({data: 'Budget added.'});
        done();
      });
  });

  it('it should GET a budget by the given id', done => {
    const budget = new Budget({
      budget: 123,
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .get(`/budget/${budg._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('budget');
          done();
        });
    });
  });

  it('it should DELETE a budget by the given id', done => {
    const budget = new Budget({
      budget: 123,
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .delete(`/budget/${budg._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql({data: 'Budget deleted.'});
          done();
        });
    });
  });
});

describe('budget expense routes', () => {
  before(async done => {
    mongoose.connect(testURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    Budget.remove({});
    Expenses.remove({});
    done();
  });

  after(async () => {
    await Budget.deleteMany({});
    await Expenses.deleteMany({});
    await mongoose.disconnect();
  });

  it('it should get all expenses', done => {
    const expense = new Expenses({
      name: 'Test expense',
      amount: 123,
    });
    const budget = new Budget({
      budget: 123,
      expenses: [expense],
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .get(`/budget/${budg._id}/expenses`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  it('it should get an expense given an expense id', done => {
    const expense = new Expenses({
      name: 'Test expense',
      amount: 123,
    });
    const budget = new Budget({
      budget: 123,
      expenses: [expense],
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .get(`/budget/${budg._id}/expenses/${budg.expenses[0]._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('name');
          res.body.should.have.property('amount');
          done();
        });
    });
  });

  it('it should get an expense summary', done => {
    const expense = new Expenses({
      name: 'Test expense',
      amount: 123,
    });
    const budget = new Budget({
      budget: 123,
      expenses: [expense],
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .get(`/budget/${budg._id}/expenses/summary`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('available');
          res.body.should.have.property('planned');
          done();
        });
    });
  });

  it('it should CREATE an expense', done => {
    const budget = new Budget({
      budget: 123,
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .post(`/budget/${budg._id}/expenses/add`)
        .send({name: 'Test expense', amount: 123})
        .end((error, res) => {
          res.should.have.status(201);
          res.body.should.be.eql('New expense added to budget!');
          done();
        });
    });
  });

  it('it should DELETE a budget by the given id', done => {
    const expense = new Expenses({
      name: 'Test expense',
      amount: 123,
    });
    const budget = new Budget({
      budget: 123,
      expenses: [expense],
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .delete(`/budget/${budg._id}/expenses/${budg.expenses[0]._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('Expense deleted.');
          done();
        });
    });
  });

  it('it should UPDATE an existing expense', done => {
    const expense = new Expenses({
      name: 'Test expense',
      amount: 123,
    });
    const budget = new Budget({
      budget: 123,
      expenses: [expense],
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .post(`/budget/${budg._id}/expenses/update/${budg.expenses[0]._id}`)
        .send({name: 'New expense', amount: 789})
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('Expense updated!');
          done();
        });
    });
  });
});
