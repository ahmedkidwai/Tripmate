const {describe, it, before, after} = require('mocha');
const {expect} = require('chai');
const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {testURI} = require('../testURI');

const router = require('../../routes/user');
const User = require('../../models/user.model');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/user', router);

describe('user routes', () => {
  before(async done => {
    mongoose.connect(testURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    done();
  });

  after(async () => {
    await User.deleteMany({});
    mongoose.disconnect();
  });

  it('/ should send all users', done => {
    request(app)
      .get('/user')
      .then(res => {
        const {body} = res;
        expect(body.length).to.equal(0);
        done();
      })
      .catch(err => done(err));
  });

  it('/add should add a new user', done => {
    app.post('/user/add', (req, res) => {
      res.send(req.body.username);
    });
    request(app)
      .post('/user/add')
      .send({username: 'newbie'})
      .then(res => {
        expect(res.status).to.equal(201);
        expect(res.body)
          .to.be.a('string')
          .to.equal('User added!');
        // you can nest requests
        request(app)
          .get('/user')
          .then(res2 => {
            const {body} = res2;
            expect(body.length).to.equal(1);
          });
        done();
      })
      .catch(err => done(err));
  });
});
