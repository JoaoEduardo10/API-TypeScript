import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteUserCrontroller {
  hendle(HttpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IDeleteUserReposytory {
  delete(id: string): Promise<User>;
}
