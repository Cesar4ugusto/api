import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTelefonePessoaUseCase } from "./DeleteTelefonePessoaUseCase";


class DeleteTelefonePessoaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id_telefone } = request.params;

        const usecase = container.resolve(DeleteTelefonePessoaUseCase);
        await usecase.execute(id_telefone);

        return response.status(204).send();
    }
}

export { DeleteTelefonePessoaController };
