import express from "express";
import authRoutes from "./auth.routes.js";
import homeRoutes from "./home.routes.js";
import transactionRoutes from "./transaction.routes.js";

const router = express.Router();

router.use(authRoutes);
router.use(homeRoutes);
router.use(transactionRoutes);

export default router;
