import { inject, injectable } from "tsyringe";
import { IPessoasEnderecosRepository, IPessoasRepository } from "@/modules/pessoas/repositories";
import { ILibGeral } from "@/shared/container/providers/Library/ILibGeral";
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
class AddEndereçoPessoaUseCase {

    constructor(
        @inject("PessoasRepository") private modelPessoa: IPessoasRepository,
        @inject("PessoasEnderecosRepository") private model: IPessoasEnderecosRepository,
        @inject("Library") private library: ILibGeral,
    ) {}

    async execute(id_pessoa: string, data: IRequest): Promise<void> {
        const fields = ["endereco", "numero", "bairro", "cidade", "estado", "cep", "endereco_tipo"];

        if (!this.library.requiredFields(fields, data)) throw new AppError("Preencha todos os campos obrigatórios para o cadastro do endereço!");
        if (!this.library.validaCEP(data.cep)) throw new AppError("CEP inválido!");

        data.cep = this.library.apenasNumeros(data.cep);

        const pessoa = await this.modelPessoa.search(id_pessoa);
        if (!pessoa) throw new AppError("Pessoa não encontrada!");

        const endereco = pessoa.enderecos.find((item) => {
            return (
                item.endereco === data.endereco &&
                item.numero === data.numero &&
                item.complemento === data.complemento &&
                item.bairro === data.bairro &&
                item.cidade === data.cidade &&
                item.estado === data.estado &&
                item.cep === data.cep &&
                item.endereco_tipo === data.endereco_tipo
            );
        });

        if (endereco) throw new AppError("Endereço já está no cadastro da pessoa!");

        await this.model.create({ id_pessoa: pessoa.id_pessoa, ...data });
    }

}

export { AddEndereçoPessoaUseCase };
