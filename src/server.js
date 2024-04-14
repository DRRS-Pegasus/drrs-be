import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";

import { router } from "./routes/functionRoute.js";

config();

const app = express();

const PORT = process.env.EXPRESS_PORT || 3000;
const FRONTEND = process.env.FRONTEND.split(", ");

console.log(FRONTEND);

let corsOptions = {
	origin: FRONTEND
}

app.use(cors(corsOptions));
app.use(json());

app.use("/api/functions", router);

app.get("/", (req, res) => {
	res.send("Express Server ");
});

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
});