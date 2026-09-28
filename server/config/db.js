const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let isConnected = false;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/digitalhub';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn('MongoDB Connection Warning:', err.message);
    console.warn('Running with mock database fallback mode for API endpoints if DB is offline.');
    isConnected = false;
  }
};

const getDBStatus = () => isConnected;

module.exports = connectDB;
module.exports.getDBStatus = getDBStatus;
