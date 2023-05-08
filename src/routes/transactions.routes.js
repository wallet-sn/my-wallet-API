import { Router } from "express";
import { createTransaction, deleteTransaction, editTransaction, getTransactions } from "../controllers/transaction.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { transactionSchema } from "../schemas/transaction.schemas.js";

const transactionRouter = Router();

transactionRouter.use(authValidation);

transactionRouter.post("/transactions", validateSchema(transactionSchema), createTransaction);
transactionRouter.get("/transactions", getTransactions);
transactionRouter.delete("/transactions/:id", deleteTransaction);
transactionRouter.put("/transactions/:id", validateSchema(transactionSchema), editTransaction);

export default transactionRouter;
