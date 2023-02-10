import { User } from "../../models/user";

export interface IGetUserRepository {
  getUser: () => Promise<User[]>;
}
