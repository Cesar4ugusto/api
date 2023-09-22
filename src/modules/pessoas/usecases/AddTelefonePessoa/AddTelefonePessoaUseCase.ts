import { inject, injectable } from "tsyringe";
import { IPessoasRepository, IPessoasTelefonesRepository } from "@/modules/pessoas/repositories";
import { ILibGeral } from "@/shared/container/providers/Interface";
import { AppError } from "@/shared/errors/AppError";

interface IRequest {
    telefone: string;
    telefone_tipo: number;
}

@injectable()
class AddTelefonePessoaUseCase {

    constructor(
        @inject("PessoasRepository") private modelPessoa: IPessoasRepository,
        @inject("PessoasTelefonesRepository") private model: IPessoasTelefonesRepository,
        @inject("Library") private library: ILibGeral,
    ) {}

    async execute(id_pessoa: string, data: IRequest): Promise<void> {
        const fields = ["telefone", "telefone_tipo"];

        if (!this.library.requiredFields(fields, data)) throw new AppError("Preencha todos os campos obrigatórios para o cadastro do telefone!");
        if (!this.library.validaTelefone(data.telefone)) throw new AppError("Telefone inválido!");

        data.telefone = this.library.apenasNumeros(data.telefone);

        const pessoa = await this.modelPessoa.search(id_pessoa);
        if (!pessoa) throw new AppError("Pessoa não encontrada!");

        const telefone = pessoa.telefones.find((item) => {
            return (
                item.telefone === data.telefone &&
                item.telefone_tipo === data.telefone_tipo
            );
        });

        if (telefone) throw new AppError("Telefone já está no cadastro da pessoa!");

        const exists = await this.model.findByTelefone(this.library.apenasNumeros(data.telefone));
        if (exists && exists.id_pessoa !== pessoa.id_pessoa) throw new AppError("Telefone já cadastrado!");

        await this.model.create({ id_pessoa: pessoa.id_pessoa, telefone: this.library.apenasNumeros(data.telefone), ...data });
    }

}

export { AddTelefonePessoaUseCase };
