import { Repository, getRepository } from "typeorm";
import { IPessoasDTO } from "@/modules/pessoas/dtos/IPessoasDTO";
import { IPessoasRepository } from "@/modules/pessoas/repositories/IPessoasRepository";
import { Pessoas } from "../entities/Pessoas";
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
    data_nascimento: Date;
    sexo: boolean;
}

class PessoasRepository implements IPessoasRepository {
    private repository: Repository<Pessoas>;

    constructor() {
        this.repository = getRepository(Pessoas);
    }

    async create(data: IPessoasDTO): Promise<void> {
        const pessoas = this.repository.create(data);
        await this.repository.save(pessoas);
    }

    async insertGetId(data: IPessoasDTO): Promise<string> {
        const pessoas = this.repository.create(data);
        await this.repository.save(pessoas);
        return pessoas.id_pessoa;
    }

    async edit(id_pessoa: string, data: IRequest): Promise<void> {
        const pessoas = await this.repository.findOne(id_pessoa);
        Object.assign(pessoas, data);
        await this.repository.save(pessoas);
    }

    async delete(id_pessoa: string): Promise<void> {
        const pessoas = await this.repository.findOne(id_pessoa);
        if (!pessoas) throw new AppError("Pessoa não encontrada!");
        pessoas.status = false;
        await this.repository.save(pessoas);
    }

    async list(): Promise<Pessoas[]> {
        return await this.repository.createQueryBuilder("pessoas")
                    .innerJoinAndSelect("pessoas.enderecos", "enderecos", "enderecos.status = :status", { status: true })
                    .innerJoinAndSelect("pessoas.telefones", "telefones", "telefones.status = :status", { status: true })
                    .getMany();
    }

    async search(id_pessoa: any): Promise<Pessoas> {
        const pessoa = await this.repository.createQueryBuilder("pessoas")
                    .innerJoinAndSelect("pessoas.enderecos", "enderecos", "enderecos.status = :status", { status: true })
                    .innerJoinAndSelect("pessoas.telefones", "telefones", "telefones.status = :status", { status: true })
                    .where("pessoas.id_pessoa = :id", { id: id_pessoa })
                    .getOne();

        if (!pessoa) throw new AppError("Pessoa não encontrada!");

        return pessoa;
    }

    async findByEmail(email: string): Promise<Pessoas> {
        return await this.repository.findOne({ email });
    }

    async findByCPF(cpf: string): Promise<Pessoas> {
        return await this.repository.findOne({ cpf });
    }

    async findByRG(rg: string): Promise<Pessoas> {
        return await this.repository.findOne({ rg });
    }

    async updateAvatar(id_pessoa: string, avatar: string): Promise<void> {
        const pessoas = await this.repository.findOne(id_pessoa);
        if (!pessoas) throw new AppError("Pessoa não encontrada!");
        pessoas.avatar = avatar;
        await this.repository.save(pessoas);
    }
}

export { PessoasRepository };
