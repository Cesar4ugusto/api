import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPessoasUseCase } from "./ListPessoasUseCase";


class ListPessoasController {

    async handle(request: Request, response: Response): Promise<Response> {

        const usecase = container.resolve(ListPessoasUseCase);
        const pessoas = await usecase.execute();

        return response.json(pessoas);
    }

}

export { ListPessoasController };
