import bcrypt from "bcrypt";
import db from "../database/db.js";
import { v4 as uuid } from "uuid";
import { signUpSchema } from "../schemas/signUp.schema.js";
import { signInSchema } from "../schemas/signIn.schema.js";

const ENCRYPTION_ROUNDS = 10;

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  const validation = signUpSchema.validate(req.body, {
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
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  const validation = signInSchema.validate(req.body, {
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
}

export async function logout(req, res) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Não autorizado!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.status(401).json({ message: "Token inválido!" });
    }

    await db.collection("sessions").deleteOne({ token });

    return res.status(200).json({ message: "Usuário deslogado com sucesso!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Ocorreu um erro ao fazer logout!" });
  }
}
