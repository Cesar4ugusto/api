import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddTelefonePessoaUseCase } from "./AddTelefonePessoaUseCase";


class AddTelefonePessoaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id_pessoa } = request.params;
        const data = request.body;

        const usecase = container.resolve(AddTelefonePessoaUseCase);
        await usecase.execute(id_pessoa, data);

        return response.status(201).send();
    }
}

export { AddTelefonePessoaController };
