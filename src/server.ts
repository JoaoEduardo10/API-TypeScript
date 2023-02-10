import express from "express";
import { config } from "dotenv";

config();

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.listen(PORT, () => console.log("SErvido iniciado"));
