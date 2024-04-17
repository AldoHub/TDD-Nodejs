const request = require('supertest');
const app = require('../src/index');

//import User model
const User = require('./../src/user/User');
//import db connection
const sequelize = require('./../src/config/database');

//init db
beforeAll(() => {
  return sequelize.sync();
});

//clean the db
beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {
  const postUser = () => {
    return request(app).post('/api/1.0/users').send({
      username: 'user1',
      email: 'user1@mail.com',
      password: 'P4ssword',
    });
  };

  it('returns 200 OK when signup request is valid', async () => {
    const response = await postUser();
    expect(response.status).toBe(200);
  });

  it('returns success message when signup request is valid', async () => {
    const response = await postUser();
    expect(response.body.message).toBe('User created');
  });

  it('saves user to the database', async () => {
    await postUser();
    const usersList = await User.findAll();
    expect(usersList.length).toBe(1);
  });

  it('saves username and email to the database', async () => {
    await postUser();
    const usersList = await User.findAll();
    const user = usersList[0];
    expect(user.username).toBe('user1');
    expect(user.email).toBe('user1@mail.com');
  });

  it('hashes the password in the database', async () => {
    await postUser();
    const usersList = await User.findAll();
    const user = usersList[0];
    expect(user.password).not.toBe('P4ssword');
  });
});
