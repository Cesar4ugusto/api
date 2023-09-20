import { Request, Response } from "express";
import { DeletePessoasUseCase } from "./DeletePessoasUseCase";
import { container } from "tsyringe";


class DeletePessoasController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id_pessoa } = request.params;
        const usecase = container.resolve(DeletePessoasUseCase);
        await usecase.execute({ id_pessoa });

        return response.status(200).send();
    }
}

export { DeletePessoasController }
