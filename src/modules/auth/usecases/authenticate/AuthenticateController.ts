import { Request, Response } from "express";
import { AuthenticateUseCase } from "./AuthenticateUseCase";
import { container } from "tsyringe";


class AuthenticateController {
    async handle(request:Request, response:Response): Promise<Response> {
        const { email, password } = request.body;

        const usecase = container.resolve(AuthenticateUseCase);
        const data = await usecase.execute({ email, password });

        return response.json(data);
    }
}

export { AuthenticateController };
