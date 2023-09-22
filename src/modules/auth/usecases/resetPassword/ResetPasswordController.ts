import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";


class ResetPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const token = String(request.query.token);
        const { senha, confirmation } = request.body;

        const usecase = container.resolve(ResetPasswordUseCase);
        await usecase.execute(token, senha, confirmation);

        return response.status(204).send();
    }
}

export { ResetPasswordController };
