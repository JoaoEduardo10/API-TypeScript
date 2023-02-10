/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import validator from "validator";

import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  Createuserparams,
  ICreateUserControllers,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserControllers implements ICreateUserControllers {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    HttpRequest: HttpRequest<Createuserparams>
  ): Promise<HttpResponse<User>> {
    try {
      const requiredFild = ["firstName", "lastName", "email", "password"];

      for (const fild of requiredFild) {
        if (!HttpRequest?.body?.[fild as keyof Createuserparams]?.length) {
          return {
            statusCode: 400,
            body: `O Campo ${fild} é obrigatorio`,
          };
        }
      }

      const emailIsValidade = validator.isEmail(HttpRequest.body!.email);

      if (!emailIsValidade) {
        return {
          statusCode: 400,
          body: "Eamil, não valido",
        };
      }

      // validar se tem body
      if (!HttpRequest.body || HttpRequest.body === undefined) {
        return {
          statusCode: 400,
          body: "Não enviou um body",
        };
      }

      const user = await this.createUserRepository.createUser(HttpRequest.body);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: `O usuario não foi criado por esse motivo: ${error.message}`,
      };
    }
  }
}
