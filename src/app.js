import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3100
app.listen(port, () => {
	console.log(`Server running on the port ${port}`)
})
