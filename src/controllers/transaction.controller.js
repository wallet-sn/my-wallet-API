import { connectToDatabase } from "../database/db.js";

export async function addTransaction(req, res) {
  const { tipo } = req.params;
  const { token, valor, descricao } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Não autorizado!" });
  }

  if (typeof valor !== "number" || valor <= 0) {
    return res
      .status(422)
      .json({ message: "O valor deve ser um número positivo!" });
  }

  if (!valor || !descricao) {
    return res
      .status(422)
      .json({ message: "Todos os campos são obrigatórios!" });
  }

  if (tipo !== "entrada" && tipo !== "saida") {
    return res.status(422).json({ message: "Tipo inválido de transação!" });
  }

  try {
    const session = await connectToDatabase.collection("sessions").findOne({ token });
    if (!session) return res.status(401).json({ message: "Token inválido!" });

    const transaction = {
      type: tipo,
      value: valor,
      description: descricao,
      userId: session.userId,
    };

    await connectToDatabase.collection("transactions").insertOne(transaction);

    return res
      .status(200)
      .json({ message: "Transação adicionada com sucesso!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Ocorreu um erro ao adicionar a transação!" });
  }
}
