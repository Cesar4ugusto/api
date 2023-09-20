import { Request, Response } from "express";
import { EditPessoasUseCase } from "./EditPessoasUseCase";
import { container } from "tsyringe";

class EditPessoasController {
    async handle(request: Request, response: Response) {
        const { id_pessoa } = request.params;
        const data = request.body;

        const usecase = container.resolve(EditPessoasUseCase);
        await usecase.execute(id_pessoa, data);

        return response.status(204).send();
    }
}

export { EditPessoasController };
