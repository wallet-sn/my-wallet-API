import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { transactionSchema } from "../schemas/transaction.schema.js";
import { validationSchema } from "../middlewares/validations.middleware.js";
import {
  addTransaction,
  listTransaction,
  deleteTransaction,
  findTransaction,
  updateTransaction,
} from "../controllers/transaction.controller.js";

const router = Router();

router.use(authMiddleware);

router.post(
  "/transactions",
  validationSchema(transactionSchema),
  addTransaction
);
router.get("/transactions", listTransaction);
router.get("/transactions/:id", findTransaction);
router.delete("/transactions/:id", deleteTransaction);
router.put(
  "/transactions/:id",
  validationSchema(transactionSchema),
  updateTransaction
);

export default router;
