import express from "express";
import fs from "fs";
import multer from "multer";
import cors from "cors";

import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  heroCreateValidation,
} from "./validations.js";

import { handleValidationErrors, checkAuth } from "./utils/index.js";

import { UserController, HeroController } from "./controllers/index.js";

mongoose
  .connect(
    "mongoDB"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/tags", HeroController.getLastTags);

app.get("/posts", HeroController.getAll);
app.get("/posts/tags", HeroController.getLastTags);
app.get("/posts/:id", HeroController.getOne);
app.post(
  "/posts",
  checkAuth,
  heroCreateValidation,
  handleValidationErrors,
  HeroController.create
);
app.delete("/posts/:id", checkAuth, HeroController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  heroCreateValidation,
  handleValidationErrors,
  HeroController.update
);
app.post(
  "/heros",
  checkAuth,
  heroCreateValidation,
  handleValidationErrors,
  HeroController.createHero
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
