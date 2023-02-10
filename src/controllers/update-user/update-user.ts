/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateUserControllers,
  IUpdateUserRepository,
  UpdateParams,
} from "./protocols";

export class UpadateUserControllers implements IUpdateUserControllers {
  constructor(private readonly updateUserRepositore: IUpdateUserRepository) {}

  async handle(HttpResquest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = HttpResquest.params.id;

      if (!id) {
        return {
          statusCode: 200,
          body: "Esta faltando o id",
        };
      }

      const allFildUpdadte: (keyof UpdateParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const fildAllowNotUpdate = Object.keys(HttpResquest.body).some(
        (key) => !allFildUpdadte.includes(key as keyof UpdateParams)
      );

      if (fildAllowNotUpdate) {
        return {
          statusCode: 400,
          body: "Not update email",
        };
      }

      const user = await this.updateUserRepositore.update(
        id,
        HttpResquest.body
      );

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: `Ocorreu este erro: ${error.message}`,
      };
    }
  }
}
