const express = require("express");
const dotenv = require("dotenv");

const functionRoute = require("./routes/functionRoute");

dotenv.config();

const app = express();
const port = process.env.EXPRESS_PORT || 3000;

app.use(express.json());

app.use("/api/functions", functionRoute);

app.get("/", (req, res) => {
	res.send("Express Server ");
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});