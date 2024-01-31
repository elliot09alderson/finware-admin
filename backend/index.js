import express from "express";
import { AdminRouter } from "./routes/adminRoute";
import { VendorRouter } from "./routes/vendorRoutes";
import bodyParser from "body-parser";
export const app = express();
import mongoose from "mongoose";
import { MONGO_URI } from "./config";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", (req, res) => {
  return res.json("Hello it is working");
});

app.use("admin/", AdminRouter);
app.use("employee/", AdminEmployeeRouter);

mongoose
  .connect(MONGO_URI, { dbName: "Test" })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.clear();
  console.log("App is listening to port 4000");
});
