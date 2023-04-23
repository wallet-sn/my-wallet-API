import { Router } from "express";
import { addTransaction } from "../controllers/transactions.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";

const transactionRoutes = Router();

transactionRoutes.use(authValidation);

transactionRoutes.post("/nova-transacao/:tipo", addTransaction);

export default transactionRoutes;
