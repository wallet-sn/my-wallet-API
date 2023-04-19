import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";


// Server creation
const app = express();


// Settings
app.use(express.json()); // determines that HTTP communication will be done using .json type files
app.use(cors()); // allows our API to be used by front-end clients
dotenv.config(); // is used to load environment variables from a .env file, may contain sensitive information


// Database setup
let db;
const mongoClient = new MongoClient(process.env.DATABASE_URL);
mongoClient.connect()
  .then(() => (db = mongoClient.db()))
  .catch((error) => console.log(error.message));


// Leave the app listening, waiting for requests
const DOOR = 5000; // Available: 3000 to 5999
app.listen(DOOR, () => console.log(`Server running on port ${DOOR}`));