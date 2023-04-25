import bcrypt from "bcrypt";
import { mongoClient } from "../database/db.js";
import { stripHtml } from "string-strip-html";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  const userData = {
    name: stripHtml(name).result.trim(),
    email,
    password: await bcrypt.hash(password, 10),
  };

  await mongoClient.db().collection("users").insertOne(userData);

  res.sendStatus(201);
}

export async function signIn(req, res) {
  const { password } = req.body;
  const { _id: loggedInUserID, name, password: hashedPassword } = res.locals.userInfo;

  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

  if (isPasswordCorrect) {
    const token = uuid();
    await mongoClient.db().collection("sessions").insertOne({ loggedInUserID, token });
    res.status(200).send({ name, token });
  } else {
    res.status(401).send("Senha incorreta!");
  }
}
