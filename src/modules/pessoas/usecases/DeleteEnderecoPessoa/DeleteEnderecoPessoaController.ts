import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteEnderecoPessoaUseCase } from "./DeleteEnderecoPessoaUseCase";


class DeleteEnderecoPessoaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id_endereco } = request.params;

        const usecase = container.resolve(DeleteEnderecoPessoaUseCase);
        await usecase.execute(id_endereco);

        return response.status(204).send();
    }
}

export { DeleteEnderecoPessoaController };
