import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log('Already connected to MongoDB');
    return;
  }
  if (connectionState === 2) {
    console.log('Connecting... to MongoDB');
    return;
  }
  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: 'news-app',
      bufferCommands: true,
    });
    console.log('Connected to MongoDB');
  } catch (error: any) {
    console.log('Error connecting to MongoDB:', error);
    throw new Error('Error connecting to MongoDB', error);
  }
};

export default connectToDB;
