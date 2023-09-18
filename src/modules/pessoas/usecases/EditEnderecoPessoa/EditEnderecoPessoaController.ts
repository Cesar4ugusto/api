import { Request, Response } from "express";
import { container } from "tsyringe";
import { EditEndereçoPessoaUseCase } from "./EditEnderecoPessoaUseCase";


class EditEndereçoPessoaController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id_endereco } = request.params;
        const data = request.body;

        const usecase = container.resolve(EditEndereçoPessoaUseCase);
        await usecase.execute(id_endereco, data);

        return response.status(204).send();
    }

}

export { EditEndereçoPessoaController };
