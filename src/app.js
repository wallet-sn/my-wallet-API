import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import db from "./database/db.js";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const ENCRYPTION_ROUNDS = 10;

app.post("/cadastro", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ message: "Todos os campos são obrigatórios!" });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(422).json({ message: "Formato de email inválido!" });
  }

  if (password.length < 3) {
    return res
      .status(422)
      .json({ message: "A senha deve ter pelo menos 3 caracteres!" });
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

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
