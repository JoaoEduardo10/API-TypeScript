import { ObjectId } from "mongodb";

import {
  IUpdateUserRepository,
  UpdateParams,
} from "../../controllers/update-user/protocols";
import { MondoDB } from "../../dataBase/mongodb";
import { User } from "../../models/user";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async update(id: string, params: UpdateParams): Promise<User> {
    await MondoDB.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const user = await MondoDB.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) throw new Error("Not update user");

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
