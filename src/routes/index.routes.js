import express from "express";
import authRoutes from "./auth.routes.js";
import transactionRoutes from "./transaction.routes.js";

const router = express.Router();

router.use(authRoutes);
router.use(transactionRoutes);

export default router;


