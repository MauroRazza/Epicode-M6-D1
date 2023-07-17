const express = require("express");
const mongoose = require("mongoose");
const logger = require("./middlewares/logger");

const PORT = 5050;

require("dotenv").config();

// require delle routes
const postsRoute = require("./routes/posts");
const authorsRoute = require("./routes/authors");

const app = express();

// middleware
app.use(express.json());
app.use(logger);

// use routes
app.use("/", postsRoute);
app.use("/", authorsRoute);

mongoose.connect(process.env.MONGO_DB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Database connection errors!"));
db.once("open", () => {
	console.log("Database connected!");
});

// ultima riga
app.listen(PORT, () =>
	console.log(`Server running and listening on port ${PORT}`)
);