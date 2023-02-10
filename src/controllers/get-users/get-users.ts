/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGetUserControllers, IGetUserRepository } from "./protocols";

export class GetUserControllers implements IGetUserControllers {
  constructor(private readonly getUserRepository: IGetUserRepository) {}

  async handle() {
    try {
      const user = await this.getUserRepository.getUser();

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: `Não foi possivel conectar a API por causa deste erro: ${error.message}`,
      };
    }
  }
}
