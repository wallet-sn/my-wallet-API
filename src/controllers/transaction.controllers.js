import dayjs from "dayjs";
import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";

export async function createTransaction(req, res) {
  const { value, description, type } = req.body;
  const { userId } = res.locals.session;

  try {
    const transaction = {
      value: Number(value),
      description,
      type,
      userId,
      date: dayjs().valueOf(),
    };
    await db.collection("transactions").insertOne(transaction);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getTransactions(req, res) {
  const { userId } = res.locals.session;

  try {
    const transactions = await db.collection("transactions").find({ userId }).sort({ date: -1 }).toArray();

    res.send(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteTransaction(req, res) {
  const { id } = req.params;
  if (!id) return res.sendStatus(404);
  const { userId } = res.locals.session;

  try {
    const result = await db.collection("transactions").deleteOne({ _id: new ObjectId(id), userId });

    if (result.deletedCount === 0) return res.sendStatus(404);
    res.sendStatus(202);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function editTransaction(req, res) {
  const { id } = req.params;
  const { value, description } = req.body;
  if (!id) return res.sendStatus(404);
  const { userId } = res.locals.session;

  try {
    const result = await db.collection("transactions").updateOne(
        { _id: new ObjectId(id), userId },
        { $set: { value: Number(value), description } }
      );

    if (result.matchedCount === 0) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
