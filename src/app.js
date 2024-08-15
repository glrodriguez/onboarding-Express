import express from "express";
import morgan from 'morgan';

// Routes
import moviesRouter from "./routes/moviesRouter.js";

// Database
import { getConnection } from "./database/database.js";

const app = express();

// Settings
app.set("port", 3000);

// Middlewares
app.use(express.json());  // Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(morgan("tiny"));

// Routes
app.use("/movies", moviesRouter);

// Database connection
export const connection = await getConnection();

app.listen(app.get("port"), () => {
  console.log("Server started on port " + app.get("port"))
});
