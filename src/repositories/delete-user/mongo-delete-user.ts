import { ObjectId } from "mongodb";

import { IDeleteUserReposytory } from "../../controllers/delete-user/protocols";
import { MondoDB } from "../../dataBase/mongodb";
import { User } from "../../models/user";

export class MongoDeleteUserReposytory implements IDeleteUserReposytory {
  async delete(id: string): Promise<User> {
    const user = await MondoDB.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) throw new Error("User not found");

    const { deletedCount } = await MondoDB.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) throw new Error("User not deleted");

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
