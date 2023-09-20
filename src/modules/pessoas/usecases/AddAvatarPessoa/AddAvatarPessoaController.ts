import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddAvatarPessoaUseCase } from "./AddAvatarPessoaUseCase";


class AddAvatarPessoaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id_pessoa } = request.params;
        const avatar = request.file.filename;

        const usecase = container.resolve(AddAvatarPessoaUseCase);
        await usecase.execute(id_pessoa, avatar);

        return response.status(204).send();
    }
}


export { AddAvatarPessoaController };
