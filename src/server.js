const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const functionRoute = require("./routes/functionRoute");

dotenv.config();

const app = express();

const PORT = process.env.EXPRESS_PORT || 3000;
const FRONTEND = process.env.FRONTEND;

let corsOptions = {
	origin: FRONTEND
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/functions", functionRoute);

app.get("/", (req, res) => {
	res.send("Express Server ");
});

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
});