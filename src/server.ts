import express from "express";
import { config } from "dotenv";
import { GetUserControllers } from "./controllers/get-users/get-users";
import { MongoGetUsersRepositories } from "./repositories/get-users/mongo-get-users";
import { MondoDB } from "./dataBase/mongodb";
import { MongoCreateUserReposytory } from "./repositories/create-users/mongo-create-user";
import { CreateUserControllers } from "./controllers/create-user/create-user";
import { MongoUpdateUserRepository } from "./repositories/update-users/mongo-update-user";
import { UpadateUserControllers } from "./controllers/update-user/update-user";
import { MongoDeleteUserReposytory } from "./repositories/delete-user/mongo-delete-user";
import { DeleteUserControllers } from "./controllers/delete-user/delete-user";

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

  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserrepository = await new MongoUpdateUserRepository();

    const updateUserController = await new UpadateUserControllers(
      mongoUpdateUserrepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).json(body);
  });

  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = await new MongoDeleteUserReposytory();

    const deleteUserController = await new DeleteUserControllers(
      mongoDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.hendle(req);

    res.status(statusCode).send(body);
  });

  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => console.log("SErvido iniciado"));
};

main();
