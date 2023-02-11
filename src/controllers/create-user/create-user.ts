/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import validator from "validator";

import { User } from "../../models/user";
import { badResponse, createdResponse } from "../helps";
import { HttpRequest, HttpResponse, IControllrs } from "../protocols";
import { Createuserparams, ICreateUserRepository } from "./protocols";

export class CreateUserControllers implements IControllrs {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    HttpRequest: HttpRequest<Createuserparams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFild = ["firstName", "lastName", "email", "password"];

      for (const fild of requiredFild) {
        if (!HttpRequest?.body?.[fild as keyof Createuserparams]?.length) {
          return badResponse(`O Campo ${fild} é obrigatorio`);
        }
      }

      const emailIsValidade = validator.isEmail(HttpRequest.body!.email);

      if (!emailIsValidade) {
        return badResponse("Eamil, não valido");
      }

      // validar se tem body
      if (!HttpRequest.body || HttpRequest.body === undefined) {
        return badResponse("Não enviou um body");
      }

      const user = await this.createUserRepository.createUser(HttpRequest.body);

      return createdResponse<User>(user);
    } catch (error: any) {
      return {
        statusCode: 500,
        body: `O usuario não foi criado por esse motivo: ${error.message}`,
      };
    }
  }
}
