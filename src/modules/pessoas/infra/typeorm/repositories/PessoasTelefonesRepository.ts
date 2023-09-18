import { IPessoasTelefonesDTO } from "@/modules/pessoas/dtos/IPessoasTelefonesDTO";
import { IPessoasTelefonesRepository } from "@/modules/pessoas/repositories/IPessoasTelefonesRepository";
import { Repository, getRepository } from "typeorm";
import { PessoasTelefones } from "@/modules/pessoas/infra/typeorm/entities/PessoasTelefones"
import { AppError } from "@/shared/errors/AppError";


class PessoasTelefonesRepository implements IPessoasTelefonesRepository {
    private repository: Repository<PessoasTelefones>;

    constructor() {
        this.repository = getRepository(PessoasTelefones);
    }

    async create(data: IPessoasTelefonesDTO): Promise<void> {
        const pessoaTelefone = this.repository.create(data);
        await this.repository.save(pessoaTelefone);
    }

    async edit(data: IPessoasTelefonesDTO): Promise<void> {
        const telefone = await this.repository.findOne(data.id_telefone);
        Object.assign(telefone, data);
        await this.repository.save(telefone);
    }

    async delete(id_telefone: string): Promise<void> {
        const telefone = await this.repository.findOne(id_telefone);
        if (!telefone) throw new AppError("Telefone não encontrado!");

        const count = await this.repository.count({ where: { id_pessoa: telefone.id_pessoa, status: true } });
        if (count === 1) throw new AppError("Não é possível excluir o único telefone cadastrado do usuário!");

        telefone.status = false;
        await this.repository.save(telefone);
    }

    async deleteByIdPessoa(id_pessoa: string): Promise<void> {
        const telefone = await this.repository.findOne({ where: { id_pessoa } });
        if (!telefone) throw new AppError("Telefone não encontrado!");
        telefone.status = false;
        await this.repository.save(telefone);
    }

    async findByTelefone(telefone: string): Promise<PessoasTelefones> {
        return await this.repository.findOne({ where: { telefone } });
    }
}

export { PessoasTelefonesRepository };
