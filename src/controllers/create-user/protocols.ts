import { User } from "../../models/user";

export interface Createuserparams {
  firstName: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: Createuserparams): Promise<User>;
}
