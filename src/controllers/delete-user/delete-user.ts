/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { IDeleteUserCrontroller, IDeleteUserReposytory } from "./protocols";

export class DeleteUserControllers implements IDeleteUserCrontroller {
  constructor(private readonly deleuserreposytories: IDeleteUserReposytory) {}

  async hendle(HttpRequest: HttpRequest<User>): Promise<HttpResponse<User>> {
    try {
      const id = HttpRequest.params.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "id não enviado",
        };
      }

      const user = await this.deleuserreposytories.delete(id);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: `Aconteceu este erro ${error.message}`,
      };
    }
  }
}
