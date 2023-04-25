import express from "express";
import { validationEmail, validationSchema } from "../middlewares/validations.middleware.js";
import { signUp, signIn } from "../controllers/auth.controller.js";
import { signInSchema } from "../schemas/signIn.schema.js";
import { signUpSchema } from "../schemas/signUp.schema.js";

const authRoutes = express.Router();

authRoutes.post("/cadastro", await validationSchema(signUpSchema), validationEmail("/cadastro"), signUp);
authRoutes.post("/", await validationSchema(signInSchema), validationEmail("/"), signIn);

export default authRoutes;
