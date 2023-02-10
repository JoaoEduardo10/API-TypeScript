import express from "express";
import { config } from "dotenv";
import { GetUserControllers } from "./controllers/get-users/get-users";
import { MongoGetUsersRepositories } from "./repositories/get-users/mongo-get-users";
import { MondoDB } from "./dataBase/mongodb";

const main = async () => {
  config();

  const app = express();

  await MondoDB.connnect();

  app.get("/users", async (_req, res) => {
    const mongoRepository = await new MongoGetUsersRepositories();

    const getUserControllers = await new GetUserControllers(mongoRepository);

    const response = await getUserControllers.handle();

    res.status(response.statusCode).json(response.body);
  });

  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => console.log("SErvido iniciado"));
};

main();
