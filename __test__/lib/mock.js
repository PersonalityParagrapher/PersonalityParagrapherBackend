const Auth = require('../../model/auth');//similar to a user
const faker = require('faker');
//const Gallery = require('../../model/gallery');

//{auth:{},gallery:{},mario:{}}
const mocks = module.exports = {};
mocks.auth = {};

mocks.auth.createOne = () => { //signup
  let result = {};
  result.password = faker.internet.password();

  return new Auth({
    username: faker.internet.userName(), //username and email template
    email: faker.internet.email(),
  })
    .generatePasswordHash(result.password) //hashing *** our passowrd using crypto/bcrypto
    .then(user => result.user = user)
    .then(user => user.generateToken()) //token allows access throughout requests to the API as long as the user is signed in
    .then(token => result.token = token)
    .then(() => {
      return result;
    });
};