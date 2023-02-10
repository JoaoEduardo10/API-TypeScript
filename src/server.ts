import express from "express";
import { config } from "dotenv";
import { GetUserControllers } from "./controllers/get-users/get-users";
import { MongoGetUsersRepositories } from "./repositories/get-users/mongo-get-users";
import { MondoDB } from "./dataBase/mongodb";
import { MongoCreateUserReposytory } from "./repositories/create-users/mongo-create-user";
import { CreateUserControllers } from "./controllers/create-user/create-user";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MondoDB.connnect();

  app.get("/users", async (_req, res) => {
    const mongoRepository = await new MongoGetUsersRepositories();

    const getUserControllers = await new GetUserControllers(mongoRepository);

    const response = await getUserControllers.handle();

    res.status(response.statusCode).json(response.body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = await new MongoCreateUserReposytory();

    const createuserController = await new CreateUserControllers(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createuserController.handle(req);

    res.status(statusCode).json(body);
  });

  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => console.log("SErvido iniciado"));
};

main();
