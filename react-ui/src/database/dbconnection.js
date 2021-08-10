const sequelize = require('sequelize');

const timezone = 'UTC';
process.env.TZ = timezone;

const connection = new sequelize.Sequelize('riad','root','', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    "timezone": "+02:00"
});

connection.sequelize = sequelize;

module.exports = connection;
