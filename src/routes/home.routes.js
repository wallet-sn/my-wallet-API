import { Router } from "express";
import { getHomePage, checkAuth } from "../controllers/home.controller.js";

const homeRoutes = Router();

homeRoutes.get("/home", getHomePage);
homeRoutes.use(["/home", "/nova-transacao"], checkAuth);

export default homeRoutes;
