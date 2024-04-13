import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  registerValidation,
  loginValidation,
  createPersonValidation,
} from "./validations/validations.js";
import checkAuth from "./utils/checkAuth.js";
import { allowCors } from "./utils/allowCors .js";
import * as UserController from "./controllers/UserController.js";
import * as PersonController from "./controllers/PersonController.js";
import * as VisitsController from "./controllers/VisitsController.js";

// mongoose
//   .connect(
//     "mongodb+srv://investvesko:psOaRrCJ813mnSYD@cluster0.qxpgtnc.mongodb.net/cafe_visits?retryWrites=true&w=majority"
//   )

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB is ok");
  })
  .catch((e) => {
    console.log("DB is error", e);
  });
const app = express();
app.use(express.json());
app.use(cors());

app.post(
  "/auth/register",
  allowCors,
  registerValidation,
  UserController.register
);
app.post("/auth/login", allowCors, loginValidation, UserController.login);
app.post("/auth/logout", allowCors, UserController.logOut);
app.get("/auth/me", allowCors, checkAuth, UserController.getMe);

app.get("/employes", allowCors, PersonController.getAll);
app.get("/employes/:id", allowCors, PersonController.getOne);
app.post(
  "/employes",
  allowCors,
  checkAuth,
  createPersonValidation,
  PersonController.create
);
app.delete("/employes/:id", allowCors, checkAuth, PersonController.remove);
app.patch("/employes/:id", allowCors, PersonController.update);

app.post("/visits", allowCors, checkAuth, VisitsController.create);
app.get("/visits", allowCors, checkAuth, VisitsController.getVisits);
app.delete("/visits/:id", allowCors, checkAuth, VisitsController.removeVisit);

app.listen(process.env.PORT || 5001, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server started!");
});
