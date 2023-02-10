/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IControllrs } from "../protocols";
import { IDeleteUserReposytory } from "./protocols";

export class DeleteUserControllers implements IControllrs {
  constructor(private readonly deleuserreposytories: IDeleteUserReposytory) {}

  async handle(HttpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
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
