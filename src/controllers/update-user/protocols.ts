import { User } from "../../models/user";

export interface UpdateParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  update(id: string, params: UpdateParams): Promise<User>;
}
