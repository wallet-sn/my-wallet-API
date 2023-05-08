import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { userSchema, loginSchema } from "../schemas/auth.schemas.js";
import { login, signUp, logout } from "../controllers/auth.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(userSchema), signUp);
authRouter.post("/login", validateSchema(loginSchema), login);
authRouter.post("/logout", authValidation, logout);

export default authRouter;
