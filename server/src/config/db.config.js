require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose;
};

console.log('mongoDB connected');

module.exports = connectDB;
