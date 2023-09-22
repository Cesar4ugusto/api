import { inject, injectable } from "tsyringe";
import { IPessoasRepository, IPessoasTelefonesRepository } from "@/modules/pessoas/repositories";
import { ILibGeral } from "@/shared/container/providers/Interface";
import { AppError } from "@/shared/errors/AppError";

interface IRequest {
    telefone: string;
    telefone_tipo: number;
}

@injectable()
class EditTelefonePessoaUseCase {

    constructor(
        @inject("PessoasRepository") private modelPessoa: IPessoasRepository,
        @inject("PessoasTelefonesRepository") private model: IPessoasTelefonesRepository,
        @inject("Library") private library: ILibGeral,
    ) {}

    async execute(id_pessoa: string, id_telefone: string, data: IRequest): Promise<void> {
        const fields = ["id_pessoa", "telefone", "telefone_tipo"];

        if (!this.library.requiredFields(fields, data)) throw new AppError("Preencha todos os campos obrigatórios para atualizar o cadastro de um telefone!");
        if (!this.library.validaTelefone(data.telefone)) throw new AppError("Telefone inválido!");

        data.telefone = this.library.apenasNumeros(data.telefone);

        const pessoa = await this.modelPessoa.search(id_pessoa);
        if (!pessoa) throw new AppError("Pessoa não encontrada!");

        const exists = await this.model.findByTelefone(data.telefone);
        if (exists && exists.id_pessoa !== pessoa.id_pessoa) throw new AppError("Telefone já existe no cadastro de outra pessoa!");

        await this.model.edit({ id_telefone, id_pessoa, ...data });
    }

}

export { EditTelefonePessoaUseCase };
