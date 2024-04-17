const User = require('./User');
const bcrypt = require('bcrypt');

const save = async (body) => {
  const hash = await bcrypt.hash(body.password, 10).catch((err) => console.log(err));
  const user = { ...body, password: hash };
  await User.create(user).catch((err) => console.log(err));
};

module.exports = { save };
