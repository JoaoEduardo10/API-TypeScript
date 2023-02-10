import express from "express";
import { config } from "dotenv";
import { GetUserControllers } from "./controllers/get-users/get-users";
import { MongoGetUsersRepositories } from "./repositories/get-users/mongo-get-users";

config();

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/users", async (_req, res) => {
  const mongoRepository = await new MongoGetUsersRepositories();

  const getUserControllers = await new GetUserControllers(mongoRepository);

  const response = await getUserControllers.handle();

  res.status(response.statusCode).json(response.body);
});

app.listen(PORT, () => console.log("SErvido iniciado"));
