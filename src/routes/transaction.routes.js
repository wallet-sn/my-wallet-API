import { Router } from "express";
import { addTransaction } from "../controllers/transaction.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const transactionRoutes = Router();

transactionRoutes.use(authMiddleware);
transactionRoutes.post("/transactions", addTransaction);

export default transactionRoutes;
