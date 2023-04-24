import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  try {
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    console.log("MongoDB connected!");
    return client.db();
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

export { connectToDatabase };

