import {
  Createuserparams,
  ICreateUserRepository,
} from "../../controllers/create-user/protocols";
import { MondoDB } from "../../dataBase/mongodb";
import { User } from "../../models/user";

export class MongoCreateUser implements ICreateUserRepository {
  async createUser(params: Createuserparams): Promise<User> {
    const { insertedId } = await MondoDB.db
      .collection("users")
      .insertOne(params);

    const user = await MondoDB.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
