import { mongoClient } from "../database/db.js";
import { ObjectId } from "mongodb";
import { stripHtml } from "string-strip-html";
import dayjs from "dayjs";

export async function addTransaction(req, res) {
  const { description, value, type } = req.body;

  const newTransactions = {
    description,
    value,
    type,
    date: dayjs().format("DD/MM/YYYY"),
  };

  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Você não possui autorização!");
  }

  try {
    const session = await db.collection("session").findOne({ token });
    if (!session) {
      return res.status(401).send("Você não possui autorização!");
    }

    const user = await db.collection("users").findOne({
      _id: new ObjectId(session.userID),
    });
    if (!user) {
      return res.status(401).send("Usuário não encontrado");
    }

    await db.collection("transactions").insertOne({
      ...newTransactions,
      userID: session.userID,
    });
    res.status(200).send("Transação inserida com sucesso!");
  } catch (error) {
    console.erroror(error);
    res.sendStatus(500);
  }
}

export async function listTransaction(req, res) {
  try {
    const userId = res.locals.session.userID;
    const filter = { userID: userId };
    const transactionsData = await mongoClient
      .db()
      .collection("transactions")
      .findOne(filter);

    const transactions = transactionsData ? transactionsData.transactions : [];
    res.status(200).send({ transactions });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await mongoClient
      .db()
      .collection("transactions")
      .deleteOne({ _id: new ObjectId(id) });
    console.log(result);

    if (result.modifiedCount === 0) {
      return res.status(404).send({ error: "Transação não encontrada!" });
    }

    return res.status(200).send({ message: "Transação excluída com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function findTransaction(req, res) {
  try {
    const userId = res.locals.session.userID;
    const transactionsData = await mongoClient
      .db()
      .collection("transactions")
      .findOne({ userID: userId });
    const transaction = transactionsData?.transactions.find((t) =>
      t.id.equals(res.locals.transactionID)
    );
    if (!transaction) {
      return res.status(404).send("Transaction not found.");
    }
    res.status(200).send(transaction);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updateTransaction(req, res) {
  const { description, value } = req.body;
  const cleanDescription = stripHtml(description).result.trim();
  const values = Math.round(value * 100).toString();

  const filter = {
    userID: res.locals.session.userID,
    "transactions.id": res.locals.transactionID,
  };
  const update = {
    $set: {
      "transactions.$.description": cleanDescription,
      "transactions.$.value": values,
    },
  };

  const result = await mongoClient
    .db()
    .collection("transactions")
    .updateOne(filter, update);

  if (result.matchedCount === 0) return res.sendStatus(404);

  const message =
    result.modifiedCount === 0 ? "Nenhum dado foi alterado" : "OK";
  res.status(200).send(message);
}
