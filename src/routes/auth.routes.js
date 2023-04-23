import express from "express";
import { signUp, signIn } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validation.middleware.js";
import { authValidation } from "../middlewares/ auth.middleware.js";
import { logout } from "../controllers/authController.js";
import { signInSchema } from "../schemas/signIn.schema.js";
import { signUpSchema } from "../schemas/signUp.schema.js";

const authRoutes = express.Router();

authRoutes.use(authValidation);

authRoutes.post("/cadastro", validateSchema(signUpSchema), signUp);
authRoutes.post("/login", validateSchema(signInSchema), signIn);
authRoutes.post("/logout", logout);

export default authRoutes;
