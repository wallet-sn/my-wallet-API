import bcrypt from "bcrypt";
import { mongoClient } from "../database/db.js";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const usuario = await mongoClient
      .db()
      .collection("users")
      .findOne({ email });
    if (usuario) return res.status(409).send("E-mail já cadastrado");

    const hash = bcrypt.hashSync(password, 10);

    await mongoClient
      .db()
      .collection("users")
      .insertOne({ name, email, password: hash });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await mongoClient.db().collection("users").findOne({ email });
    if (!user) return res.status(401).send("E-mail não cadastrado.");

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) return res.status(401).send("Senha incorreta");

    const token = uuid();
    await mongoClient
      .db()
      .collection("sessions")
      .insertOne({ token, userID: user._id });
    res.send(token);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
