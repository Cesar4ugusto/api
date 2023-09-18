import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreatePessoasUseCase } from "./CreatePessoasUseCase";

class CreatePessoasController {
    async handle(request: Request, response: Response): Promise<Response> {
        const data = request.body;

        const usecase = container.resolve(CreatePessoasUseCase);
        await usecase.execute(data);

        return response.status(201).send();
    }
}

export { CreatePessoasController };
