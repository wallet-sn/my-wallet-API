import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

const mongoClient = new MongoClient(DATABASE_URL);

let db;

async function connectDb() {
  try {
    await mongoClient.connect();
    console.log("Conectado com sucesso ao MongoDB!");
    db = mongoClient.db();
  } catch (error) {
    console.log(`Falha ao conectar ao banco de dados. ${error}`);
    process.exit(1);
  }
}

connectDb();

export default db;
