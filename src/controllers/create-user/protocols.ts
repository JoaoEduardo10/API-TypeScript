import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface ICreateUserControllers {
  handle(
    HttpRequest: HttpRequest<Createuserparams>
  ): Promise<HttpResponse<User>>;
}

export interface Createuserparams {
  firstName: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: Createuserparams): Promise<User>;
}
