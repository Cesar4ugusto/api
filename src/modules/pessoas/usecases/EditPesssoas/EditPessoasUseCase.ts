import { inject, injectable } from "tsyringe";
import { ILibGeral } from "@/shared/container/providers/Library/ILibGeral";
import { IPessoasRepository } from "@/modules/pessoas/repositories";
import { AppError } from "@/shared/errors/AppError";

interface IRequest {
    nome: string;
    nome_social?: string;
    email: string;
    email_alternativo?: string;
    cpf: string;
    rg: string;
    nome_pai: string;
    nome_mae: string;
    data_nascimento: string;
    sexo: boolean;
}

@injectable()
class EditPessoasUseCase {
    constructor(
        @inject("PessoasRepository") private model: IPessoasRepository,
        @inject("Library") private library: ILibGeral,
    ) {}

    async execute(id_pessoa: string, data: IRequest): Promise<void> {
        const fieldsPessoa = ["nome", "email", "cpf", "rg", "nome_pai", "nome_mae", "data_nascimento", "sexo"];

        if (!this.library.requiredFields(fieldsPessoa, data)) throw new AppError("Preencha todos os campos obrigatórios para a edição do cadastro da pessoa!");

        if (!this.library.validaCPF(data.cpf)) throw new AppError("CPF inválido!");
        if (!this.library.validaEmail(data.email)) throw new AppError("Email inválido!");
        if (data.email_alternativo && !this.library.validaEmail(data.email_alternativo)) throw new AppError("Email Alternativo inválido!");

        const email = await this.model.findByEmail(data.email);
        const cpf = await this.model.findByCPF(data.cpf);
        const rg = await this.model.findByRG(data.rg);

        if (email && email.id_pessoa !== id_pessoa) throw new AppError("Já existe um cadastro com esse email!");
        if (cpf && cpf.id_pessoa !== id_pessoa) throw new AppError("Já existe um cadastro com esse CPF!");
        if (rg && rg.id_pessoa !== id_pessoa) throw new AppError("Já existe um cadastro com esse RG!");

        if (!data.nome_social) {
            data.nome_social = data.nome;
        };

        this.library.formatToIso(data.data_nascimento);

        await this.model.edit(id_pessoa, { ...data, data_nascimento: this.library.formatToIso(data.data_nascimento)});
    }
}

export { EditPessoasUseCase };
