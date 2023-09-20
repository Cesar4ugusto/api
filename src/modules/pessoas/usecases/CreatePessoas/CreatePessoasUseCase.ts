import { inject, injectable } from "tsyringe";
import { AppError } from "@/shared/errors/AppError";
import { IPessoasRepository, IPessoasEnderecosRepository, IPessoasTelefonesRepository } from "@/modules/pessoas/repositories";
import { ILibGeral } from "@/shared/container/providers/Library/Interface";

interface IEndereco {
    endereco: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    endereco_tipo: number;
}

interface ITelefone {
    telefone: string;
    telefone_tipo: number;
}

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
    endereco: IEndereco[];
    telefone: ITelefone[];
}

@injectable()
class CreatePessoasUseCase {
    constructor(
        @inject("PessoasRepository") private model: IPessoasRepository,
        @inject("PessoasEnderecosRepository") private modelEndereco: IPessoasEnderecosRepository,
        @inject("PessoasTelefonesRepository") private modelTelefone: IPessoasTelefonesRepository,
        @inject("Library") private library: ILibGeral,
    ) {}

    async execute(data: IRequest): Promise<void> {
        const fieldsPessoa = ["nome", "email", "cpf", "rg", "nome_pai", "nome_mae", "data_nascimento", "sexo"];
        const fieldsEndereco = ["endereco", "numero", "bairro", "cidade", "estado", "cep", "endereco_tipo"];
        const fieldsTelefone = ["telefone", "telefone_tipo"];

        if (!this.library.requiredFields(fieldsPessoa, data)) throw new AppError("Preencha todos os campos obrigatórios para o cadastro da pessoa!");

        if (!this.library.validaCPF(data.cpf)) throw new AppError("CPF inválido!");
        if (!this.library.validaEmail(data.email)) throw new AppError("Email inválido!");
        if (data.email_alternativo && !this.library.validaEmail(data.email_alternativo)) throw new AppError("Email Alternativo inválido!");

        if (await this.model.findByEmail(data.email)) throw new AppError("Já existe um cadastro com esse email!");
        if (await this.model.findByCPF(data.cpf)) throw new AppError("Já existe um cadastro com esse CPF!");
        if (await this.model.findByRG(data.rg)) throw new AppError("Já existe um cadastro com esse RG!");

        const pass = await this.library.hashPassword(this.library.apenasNumeros(data.cpf));

        if (!data.nome_social) {
            data.nome_social = data.nome;
        }

        try {

            const id_pessoa = await this.model.insertGetId({
                nome: data.nome,
                nome_social: data.nome_social,
                email: data.email,
                email_alternativo: data.email_alternativo,
                senha: pass,
                cpf: this.library.apenasNumeros(data.cpf),
                rg: this.library.apenasNumeros(data.rg),
                nome_pai: data.nome_pai,
                nome_mae: data.nome_mae,
                data_nascimento: this.library.formatToIso(data.data_nascimento),
                sexo: data.sexo,
            });

            data.endereco.map(async (item, index) => {
                if (!this.library.requiredFields(fieldsEndereco, item)) throw new AppError("Preencha todos os campos obrigatórios de endereço!");
                if (!this.library.validaCEP(item.cep)) throw new AppError(`CEP ${index} inválido!`);

                await this.modelEndereco.create({
                    id_pessoa,
                    endereco: item.endereco,
                    numero: item.numero,
                    complemento: item.complemento,
                    bairro: item.bairro,
                    cidade: item.cidade,
                    estado: item.estado,
                    cep: this.library.apenasNumeros(item.cep),
                    endereco_tipo: item.endereco_tipo,
                });
            });

            data.telefone.map(async (item, index) => {
                if (!this.library.requiredFields(fieldsTelefone, item)) throw new AppError("Preencha todos os campos obrigatórios de telefone!");
                if (!this.library.validaTelefone(item.telefone)) throw new AppError(`Telefone ${index} inválido!`);
                if (await this.modelTelefone.findByTelefone(item.telefone)) throw new AppError(`Já existe um cadastro com o telefone ${index}!`);

                await this.modelTelefone.create({
                    id_pessoa,
                    telefone: this.library.apenasNumeros(item.telefone),
                    telefone_tipo: item.telefone_tipo,
                });
            });

        } catch (error) {
            throw new AppError(error);
        }
    }
}

export { CreatePessoasUseCase };
