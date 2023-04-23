import db from "../database/db.js";

export async function getHomePage(req, res) {
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

    const user = await db.collection("users").findOne({ _id: session.userId });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const transactions = await db
      .collection("transactions")
      .find({ userId: session.userId })
      .sort({ createdAt: -1 })
      .toArray();

    const balance = transactions.reduce((accumulator, transaction) => {
      if (transaction.type === "entrada") {
        accumulator += transaction.value;
      } else {
        accumulator -= transaction.value;
      }
      return accumulator;
    }, 0);

    return res.status(200).json({ user: user.name, transactions, balance });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Ocorreu um erro ao listar as transações!" });
  }
}

export async function checkAuth(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.redirect("/login");
  }

  const token = authHeader.split(" ")[1];

  const session = await db.collection("sessions").findOne({ token });

  if (!session) {
    return res.redirect("/login");
  }

  next();
}
