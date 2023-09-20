import { IPessoasEnderecosDTO } from "@/modules/pessoas/dtos/IPessoasEnderecosDTO";
import { IPessoasEnderecosRepository } from "@/modules/pessoas/repositories/IPessoasEnderecosRepository";
import { Repository, getRepository } from "typeorm";
import { PessoasEnderecos } from "../entities/PessoasEnderecos";
import { AppError } from "@/shared/errors/AppError";


class PessoasEnderecosRepository implements IPessoasEnderecosRepository {
    private repository: Repository<PessoasEnderecos>;

    constructor() {
        this.repository = getRepository(PessoasEnderecos);
    }

    async create(data: IPessoasEnderecosDTO): Promise<void> {
        const endereco = this.repository.create(data);
        await this.repository.save(endereco);
    }

    async edit(data: IPessoasEnderecosDTO): Promise<void> {
        const endereco = await this.repository.findOne(data.id_endereco);
        if (!endereco) throw new AppError("Endereço não encontrado!");
        Object.assign(endereco, data);
        await this.repository.save(endereco);
    }

    async delete(id_endereco: string): Promise<void> {
        const endereco = await this.repository.findOne(id_endereco);
        if (!endereco) throw new AppError("Endereço não encontrado!");

        const count = await this.repository.count({ where: { id_pessoa: endereco.id_pessoa, status: true } });
        if (count === 1) throw new AppError("Não é possível excluir o único endereço cadastrado do usuário!");

        endereco.status = false;
        await this.repository.save(endereco);
    }

    async deleteByIdPessoa(id_pessoa: string): Promise<void> {
        const endereco = await this.repository.findOne({ where: { id_pessoa } });
        if (!endereco) throw new AppError("Endereço não encontrado!");
        endereco.status = false;
        await this.repository.save(endereco);
    }

    async findByIdPessoa(id_pessoa: string): Promise<PessoasEnderecos[]> {
        return await this.repository.find({ where: { id_pessoa } });;
    }
}

export { PessoasEnderecosRepository };
