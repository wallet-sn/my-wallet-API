import express from "express";
import { validationSchema } from "../middlewares/validations.middleware.js";
import { signUp, signIn } from "../controllers/auth.controller.js";
import { signInSchema } from "../schemas/signIn.schema.js";
import { signUpSchema } from "../schemas/signUp.schema.js";

const authRoutes = express.Router();

authRoutes.post("/cadastro", validationSchema(signUpSchema), signUp);
authRoutes.post("/", validationSchema(signInSchema), signIn);

export default authRoutes;
