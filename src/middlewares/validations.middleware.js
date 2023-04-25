import { mongoClient } from "../database/db.js";
import { ObjectId } from "mongodb";

export async function validationSchema(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      res.status(422).send(error.details.map((detail) => detail.message));
    }
  };
}

export async function validationEmail(req, res, next) {
  const { email } = req.body;
  try {
    const user = await mongoClient.db().collection("users").findOne({ email });
    if (req.url === "/cadastro" && user)
      return res.status(409).send("O email digitado já existe!");
    if (req.url === "/" && !user)
      return res.status(404).send("Email não registrado!");
    res.locals.userInfo = user;
    next();
  } catch (error) {
    res.status(500).send("Erro ao validar email: " + error.message);
  }
}

export async function validationTransaction(req, res, next) {
  const parsedTransaction =
    req.params?.id && ObjectId.isValid(req.params.id)
      ? new ObjectId(req.params.id)
      : null;

  if (!parsedTransaction) return res.status(401).send("Transação inválida!");

  const session = res.locals.session;
  const filter = {
    userID: session.userID,
    "transactions.id": parsedTransaction,
  };
  try {
    const isValid = await mongoClient.db().collection("transactions").findOne(filter);

    if (!isValid) return res.status(401).send("Transação inválida!");

    res.locals.parsedTransaction = parsedTransaction;
    next();
  } catch (error) {
    res.status(500).send("Erro ao validar transação: " + error.message);
  }
}

