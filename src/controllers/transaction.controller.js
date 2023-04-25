import { mongoClient } from "../database/db.js";
import { ObjectId } from "mongodb";
import { stripHtml } from "string-strip-html";
import dayjs from "dayjs";

export async function addTransaction(req, res) {
  const {
    description,
    value,
    type,
    date = dayjs().format("DD/MM/YYYY"),
  } = req.body;
  const cleanDescription = stripHtml(description).result.trim();
  const roundedValue = (Number(value) * 100).toFixed(0);

  try {
    const session = res.locals.session;
    const transaction = {
      id: new ObjectId(),
      description: cleanDescription,
      value: roundedValue,
      type,
      date,
    };
    const filter = { userID: session.userID };
    const update = { $push: { transactions: transaction } };
    const options = { upsert: true };

    await mongoClient.db().collection("transactions").updateOne(filter, update, options);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function listTransaction(req, res) {
  try {
    const userId = res.locals.session.userID;
    const filter = { userID: userId };
    const transactionsData = await mongoClient.db()
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
    const session = res.locals.session;
    const query = { $pull: { transactions: { id: res.locals.transactionID } } };

    const result = await mongoClient.db()
      .collection("transactions")
      .updateOne({ userID: session.userID }, query, { upsert: false });

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
    const transactionsData = await mongoClient.db()
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

  const result = await mongoClient.db().collection("transactions").updateOne(filter, update);

  if (result.matchedCount === 0) return res.sendStatus(404);

  const message = result.modifiedCount === 0 ? "Nenhum dado foi alterado" : "OK";
  res.status(200).send(message);
}
