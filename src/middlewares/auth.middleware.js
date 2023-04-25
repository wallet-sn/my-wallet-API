import { mongoClient } from "../database/db.js";

export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  try {
    const session = await mongoClient.db().collection("sessions").findOne({ token });
    const user =
      session &&
      (await mongoClient.db().collection("users").findOne({ _id: session.userID }));
    if (!user) return res.sendStatus(401);

    res.locals.session = session;

    next();
  } catch (error) {
    res.status(500).send("Erro ao autenticar usuário: " + error.message);
  }
}
