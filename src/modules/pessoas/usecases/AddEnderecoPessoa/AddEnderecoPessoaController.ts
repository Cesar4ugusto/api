import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddEndereçoPessoaUseCase } from "./AddEnderecoPessoaUseCase";


class AddEndereçoPessoaController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id_pessoa } = request.params;
        const data = request.body;

        const usecase = container.resolve(AddEndereçoPessoaUseCase);
        await usecase.execute(id_pessoa, data);

        return response.status(201).send();
    }

}

export { AddEndereçoPessoaController };
