import mongoose from "mongoose";

const dbURI = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    
    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
