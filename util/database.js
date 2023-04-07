const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'nothingDb', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
