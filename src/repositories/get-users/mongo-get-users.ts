import { IGetUserRepository } from "../../controllers/get-users/protocols";
import { MondoDB } from "../../dataBase/mongodb";
import { User } from "../../models/user";

export class MongoGetUsersRepositories implements IGetUserRepository {
  async getUser() {
    const users = await MondoDB.db
      .collection<Omit<User, "id">>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
