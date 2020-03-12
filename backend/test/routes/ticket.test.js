process.env.NODE_ENV = 'test';

const {describe, it, beforeEach, afterEach} = require('mocha');
const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const {testURI} = require('../testURI');
const server = require('../../server');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

const {Ticket} = require('../../models/ticket.model');

chai.use(chaiHttp);

describe('ticket routes', () => {
  beforeEach(async done => {
    mongoose.connect(testURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    Ticket.remove({});
    done();
  });

  afterEach(async () => {
    await Ticket.deleteMany({});
    await mongoose.disconnect();
  });

  it('/ should get all tickets of :tripId', done => {
    chai
      .request(server)
      .get('/5e6aeefdb3256d55d6091d82/ticket')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('it add should add a new ticket', done => {
    chai
      .request(server)
      .post('/5e6aeefdb3256d55d6091d82/ticket/add')
      .send({
        transportType: 'Bus',
        start: {
          location: 'Start Location',
          date: '2020-01-01',
        },
        end: {
          location: 'End Location',
          date: '2020-01-01',
        },
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql('Ticket added!');
        done();
      });
  });

  it('it should GET a ticket by the given id', done => {
    const ticket = new Ticket({
      transportType: 'Bus',
      start: {
        location: 'Start Location',
        date: '2020-01-01',
      },
      end: {
        location: 'End Location',
        date: '2020-01-01',
      },
    });
    ticket.save((err, tick) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .get(`/1/ticket/${tick._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('transportType');
          done();
        });
    });
  });

  it('it should DELETE a ticket by the given id', done => {
    const ticket = new Ticket({
      transportType: 'Bus',
      start: {
        location: 'Start Location',
        date: '2020-01-01',
      },
      end: {
        location: 'End Location',
        date: '2020-01-01',
      },
    });
    ticket.save((err, tick) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .delete(`/1/ticket/${tick._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('Ticket deleted.');
          done();
        });
    });
  });

  it('it should UPDATE a ticket', done => {
    const ticket = new Ticket({
      transportType: 'Bus',
      start: {
        location: 'Start Location',
        date: '2020-01-01',
      },
      end: {
        location: 'End Location',
        date: '2020-01-01',
      },
    });
    ticket.save((err, tick) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .post(`/1/ticket/update/${tick._id}`)
        .send({transportType: 'Rail'})
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('Ticket updated!');
          done();
        });
    });
  });
});
