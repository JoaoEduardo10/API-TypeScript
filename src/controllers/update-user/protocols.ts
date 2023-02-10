import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserControllers {
  handle(HttpResquest: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IUpdateUserRepository {
  update(id: string, params: UpdateParams): Promise<User>;
}
