import mongoose from 'mongoose';

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is not set. Course fallback still works on frontend, but database writes will fail.');
    return;
  }

  const mongoUri = process.env.MONGO_URI.trim().replace(/;+$/, '');

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectDB;
