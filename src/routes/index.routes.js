import { Router } from "express";
import authRouter from "./auth.routes.js";
import transactionRouter from "./transactions.routes.js";

const router = Router();
router.use(authRouter);
router.use(transactionRouter);

export default router;
