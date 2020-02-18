const {expect} = require('chai');
const {describe, it} = require('mocha');
const User = require('../../models/user.model');

describe('user', () => {
  it('should be invalid if username is empty', done => {
    const user = new User();

    user.validate(err => {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it('should be invalid if username is short', done => {
    const user = new User({username: 'ha'});

    user.validate(err => {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it('should be valid username is longer than 2 letters', done => {
    const user = new User({username: 'hot'});

    user.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
