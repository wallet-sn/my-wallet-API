import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import db from "./database/db.js";
import { v4 as uuid } from "uuid";
import Joi from "joi";


const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();


const ENCRYPTION_ROUNDS = 10;


const registrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});


const signInValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});


app.post("/cadastro", async (req, res) => {
  const { name, email, password } = req.body;

  const validation = registrationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    return res
      .status(422)
      .send(validation.details.map((detail) => detail.message));
  }

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "Já existe usuário com este endereço de email!" });
  }

  const hashedPassword = await bcrypt.hash(password, ENCRYPTION_ROUNDS);

  await db
    .collection("users")
    .insertOne({ name, email, password: hashedPassword });

  return res.status(201).json({ message: "Usuário criado com sucesso!" });
});


app.post("/", async (req, res) => {
  const { email, password } = req.body;

  const validation = signInValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error)
    return res
      .status(422)
      .send(validation.error.details.map((detail) => detail.message));

  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Senha incorreta!" });
  }

  const token = uuid();

  await db.collection("sessions").insertOne({ token, userId: user._id });

  res.status(200).json({ token });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
