// Module
import express from "express";
import { config } from "dotenv";
import Logger from "./middlewares/logger.js";
import HandleError from "./middlewares/handleError.js";
import router from "./router/index.js";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

// ENV
const PORT = process.env.PORT || 3000;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE_NAME = process.env.DB_DATABASE_NAME;

const app = express();

// connect database (mongodb)
mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@backenddb.0rave.mongodb.net/${DB_DATABASE_NAME}?retryWrites=true&w=majority&appName=BackendDB`
  )
  .then(() => {
    console.log("connected to Database");
  })
  .catch((error) => {
    console.log(error);
  });

// Client request to server
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// --------------------------------------------------

app.use(cookieParser("secret_key"));
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
// app.use(cors())

// logger
app.use(Logger);

// Router
app.use(router);

// Handle error route not found
app.use((req, res, next) => {
  const err = new Error("not found");
  err.status = 404;
  next(err);
});

// General error handling
app.use(HandleError);

// listen
app.listen(PORT, () => {
  console.log(`Server running port: ${PORT}`);
});
