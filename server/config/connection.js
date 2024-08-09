const { connect, connection } = require('mongoose');
const { config } = require('dotenv');
config();

const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/trainer_hubDB';
connect(db);

connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

connection.on('error', (err) => {
  console.log('MongoDB connection error: ', err);
});
module.exports = connection;
