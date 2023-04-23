import db from "../database/db";

export default async function authMiddleware(req, res, next) {
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

    req.userId = session.userId;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Ocorreu um erro!" });
  }
}
