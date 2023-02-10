import { IGetUserRepository } from "../../controllers/get-users/protocols";

export class MongoGetUsersRepositories implements IGetUserRepository {
  async getUser() {
    return [
      {
        firstName: "João",
        lastName: "Eduardo",
        email: "joao2gmail.com",
        password: "eduj1234",
      },
    ];
  }
}
