import { inject, injectable } from "tsyringe";
import { IPessoasEnderecosRepository, IPessoasRepository } from "@/modules/pessoas/repositories";
import { ILibGeral } from "@/shared/container/providers/Library/Interface";
import { AppError } from "@/shared/errors/AppError";

interface IRequest {
    endereco: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    endereco_tipo: number;
}

@injectable()
class EditEndereçoPessoaUseCase {

    constructor(
        @inject("PessoasRepository") private modelPessoa: IPessoasRepository,
        @inject("PessoasEnderecosRepository") private model: IPessoasEnderecosRepository,
        @inject("Library") private library: ILibGeral,
    ) {}

    async execute(id_pessoa: string, id_endereco: string, data: IRequest): Promise<void> {
        const fields = ["endereco", "numero", "bairro", "cidade", "estado", "cep", "endereco_tipo"];

        if (!this.library.requiredFields(fields, data)) throw new AppError("Preencha todos os campos obrigatórios para atualizar o cadastro de um endereço!");
        if (!this.library.validaCEP(data.cep)) throw new AppError("CEP inválido!");

        data.cep = this.library.apenasNumeros(data.cep);

        const pessoa = await this.modelPessoa.search(id_pessoa);
        if (!pessoa) throw new AppError("Pessoa não encontrada!");

        await this.model.create({ id_endereco, id_pessoa, ...data });
    }

}

export { EditEndereçoPessoaUseCase };
