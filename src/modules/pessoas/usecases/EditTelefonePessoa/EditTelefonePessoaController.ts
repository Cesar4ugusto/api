import { Request, Response } from "express";
import { container } from "tsyringe";
import { EditTelefonePessoaUseCase } from "./EditTelefonePessoaUseCase";


class EditTelefonePessoaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id_pessoa, id_telefone } = request.params;
        const data = request.body;

        const usecase = container.resolve(EditTelefonePessoaUseCase);
        await usecase.execute(id_pessoa, id_telefone, data);

        return response.status(204).send();
    }
}

export { EditTelefonePessoaController };
