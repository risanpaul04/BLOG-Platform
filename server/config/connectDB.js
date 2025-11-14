import mongoose from 'mongoose';

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI, clientOptions);
    console.log(`Successfully connected to MongoDB \n${conn.connection.base} \n${conn.connection.host}`);
  } catch (error) {
    console.log(`Couldn't connect to MongoDB Instance\n${error.message}`);
    process.exit(1);
  }
}

export default connectDB;