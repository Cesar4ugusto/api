import { Request, Response } from "express";
import { SearchPessoaUseCase } from "./SearchPessoaUseCase";
import { container } from "tsyringe";


class SearchPessoaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id_pessoa } = request.params;

        const usecase = container.resolve(SearchPessoaUseCase);
        const pessoa = await usecase.execute(id_pessoa);

        return response.json(pessoa);
    }
}

export { SearchPessoaController };
