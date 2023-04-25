import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { transactionSchema } from "../schemas/transaction.schema.js";
import { validationSchema, validationTransaction } from "../middlewares/validations.middleware.js";
import { addTransaction, listTransaction, deleteTransaction, findTransaction, updateTransaction } from "../controllers/transaction.controller.js";

const transactionRoutes = express.Router();

transactionRoutes.use(authMiddleware);

transactionRoutes
  .route("/transactions")
  .post(validationSchema(transactionSchema), (req, res, next) => {
    addTransaction(req, res, next).catch(next);
  })
  .get(listTransaction);

transactionRoutes
  .route("/transactions/:id")
  .all(validationTransaction)
  .get(findTransaction)
  .delete(deleteTransaction)
  .put(validationSchema(transactionSchema), (req, res, next) => {
    updateTransaction(req, res, next).catch(next);
  });

export default transactionRoutes;
