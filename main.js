const app = require('./src/index');
const sequelize = require('./src/config/database');

sequelize.sync();

//separate the listen method in order to avoid errors while doing the test for the index
app.listen('3000', () => {
  console.log('SERVER LISTENING ON PORT 3000');
});
