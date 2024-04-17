const express = require('express');
const router = express.Router();

const userService = require('./UserService');

//routes
router.post('/api/1.0/users/', async (req, res) => {
  //return res.status(500).send(); // this will fail

  await userService.save(req.body);
  return res.send({ message: 'User created' }); //default is 200
});

module.exports = router;
