import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const dbConnection = async () => {
  const dbURI = process.env.MONGO_URI;
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the Database(P01-C01) Successfully...");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default dbConnection;
