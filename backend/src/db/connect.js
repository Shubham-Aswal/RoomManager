import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({
  path: './.env',
});

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in the environment variables.');
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to db successfully');

    const logPath = new URL('./startupLog.txt', import.meta.url);
    fs.appendFileSync(
      logPath,
      `\n[success] connected to db, time - ${new Date().toISOString()}, date - ${Date.now()}`,
    );
  } catch (error) {
    console.error('unable to connect to db - connect.js:', error.message);

    const logPath = new URL('./startupLog.txt', import.meta.url);
    fs.appendFileSync(
      logPath,
      `\n[failure] unable to connected to db, time - ${new Date().toISOString()}, date - ${Date.now()}`,
    );

    throw error;
  }
};

export default connectDB;
