import express from "express";

import bodyParser from "body-parser";
export const app = express();
import dotenv from "dotenv";

import { AdminEmployeeRouter, AdminRouter } from "./routes";
// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", (req, res) => {
  return res.json("Hello it is working");
});
app.use(dotenv.config());

// main mega routes
app.use("admin/", AdminRouter);
app.use("employee/", AdminEmployeeRouter);
app.use("*", (req, res, next) => {
  res.send("<h1>PAGE NOT FOUND</h1>");
});

const PORT = process.env.PORT || 5000;
DbConnect.then(() =>
  app.listen(PORT, () => {
    console.clear();
    console.log(`App is listening to port ${PORT}`);
  })
).catch((error) => console.log(error.message));
