'use strict';

const superagent = require('superagent');
const faker = require('faker');

const mocks = require('../lib/mocks');
const server = require('../../lib/server');
const Auth = require('../../model/auth');

// Const vars
const PORT = process.env.PORT;
const ENDPOINT_SIGNIN = `:${PORT}/api/v1/signin`;
const ENDPOINT_SIGNUP = `:${PORT}/api/v1/signup`;

describe('GET /api/v1/signup', () => {
  let getResponse = null;
  // Create a fake account and save the response, then get it for testing
  beforeAll(() => server.start(PORT, () => console.log(`Listening on ${PORT}`)));
  afterAll(() => server.stop());
  afterAll(() => mocks.auth.removeAll());


  describe('Valid', () => {
    beforeAll(() => {
      mocks.auth.createOne()
        .then(mockObj => {
          console.log('mockObj');
          console.log(mockObj);
          superagent.get(ENDPOINT_SIGNIN)
            .auth(this.mockObj.user.username, this.mockObj.password)
            .then(res => {
              console.log('res');
              console.log(res);
              getResponse = res;
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    });

    it('should respond with a status of 200', () => {
      console.log('mockObj');
      console.log(this.mockObj);
      expect(getResponse.status).toBe(200);
    });
  });

  describe('Invalid', () => {
    // it('should get a 401 if the user could not be authenticated', () => {
      // return superagent.get(ENDPOINT_SIGNIN)
        // .auth('fake-username', 'fake-password')
        // .catch(err => expect(err.status).toBe(401));
    // });
//
    // it('should respond with not found or path error when given an invalid path', () => {
      // return superagent.get(ENDPOINT_SIGNIN)
        // .send()
        // .catch(err => {
          // expect(err.response.text).toMatch(/Auth/);
        // });
    // });
//
    // it('should respond a not found or path error when given an invalid path', () => {
      // return superagent.get(ENDPOINT_SIGNIN)
        // .auth('', this.mockObj.user.password)
        // .catch(err => {
          // expect(err.response.text).toMatch(/Auth/);
        // });
    // });
//
    // it('should respond a not found or path error when given an invalid path', () => {
      // return superagent.get(ENDPOINT_SIGNIN)
        // .auth(this.mockObj.user.username, '')
        // .catch(err => {
          // expect(err.response.text).toMatch(/Auth/);
        // });
    // });
//
    // it('should respond a not found or path error when given an invalid path', () => {
      // return superagent.get(ENDPOINT_SIGNIN)
        // .auth(this.mockObj.user.username, 'incorrectpassword')
        // .catch(err => {
          // expect(err.response.text).toMatch(/Auth/);
        // });
    // });
  });
});
