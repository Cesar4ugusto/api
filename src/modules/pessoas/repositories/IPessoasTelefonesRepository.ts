import { IPessoasTelefonesDTO } from "@/modules/pessoas/dtos/IPessoasTelefonesDTO";
import { PessoasTelefones } from "@/modules/pessoas/infra/typeorm/entities/PessoasTelefones";

interface IPessoasTelefonesRepository {
    create(data: IPessoasTelefonesDTO): Promise<void>;
    edit(data: IPessoasTelefonesDTO): Promise<void>;
    delete(id_telefone: string): Promise<void>;
    deleteByIdPessoa(id_pessoa: string): Promise<void>;
    findByTelefone(telefone: string): Promise<PessoasTelefones>;
}

export { IPessoasTelefonesRepository };
