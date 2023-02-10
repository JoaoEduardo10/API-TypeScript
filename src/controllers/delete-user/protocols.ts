import { User } from "../../models/user";

export interface IDeleteUserReposytory {
  delete(id: string): Promise<User>;
}
