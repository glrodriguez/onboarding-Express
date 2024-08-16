import express from "express";
import morgan from 'morgan';
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import MongoStore from "connect-mongo";

// Routes
import moviesRouter from "./routes/moviesRouter.js";
import userRouter from "./routes/usersRouter.js";

// Database
import { getConnection } from "./database/database.js";

import User from "./models/userModel.js";


const app = express();

// Database connection
export const connection = await getConnection();

// Settings
app.set("port", 3000);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'KJDBAsk;djba;KJDB;akdjba;D',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongoUrl: "mongodb://localhost:27017/onboarding-Express",
    collectionName: 'sesions'
  })
}));

const strategy = new Strategy(User.authenticate())

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log('Usuario deserializado:', user);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(morgan("tiny"));

// Routes
app.use("/movies", moviesRouter);
app.use("/users", userRouter);

app.listen(app.get("port"), () => {
  console.log("Server started on port " + app.get("port"))
});
