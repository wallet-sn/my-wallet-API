import express from "express";
import { signUp, signIn, logoutUser } from "../controllers/auth.controller.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { signInSchema } from "../schemas/signIn.schema.js";
import { signUpSchema } from "../schemas/signUp.schema.js";

const authRoutes = express.Router();

authRoutes.use(authMiddleware);

authRoutes.post("/cadastro", validationMiddleware(signUpSchema), signUp);
authRoutes.post("/login", validationMiddleware(signInSchema), signIn);
authRoutes.post("/logout", authMiddleware, logoutUser);

export default authRoutes;
