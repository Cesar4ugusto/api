import { IPessoasEnderecosDTO } from "@/modules/pessoas/dtos/IPessoasEnderecosDTO";

interface IPessoasEnderecosRepository {
    create(data: IPessoasEnderecosDTO): Promise<void>;
    edit(data: IPessoasEnderecosDTO): Promise<void>;
    delete(id_endereco: string): Promise<void>;
    deleteByIdPessoa(id_pessoa: string): Promise<void>;
    findByIdPessoa(id_pessoa: string): Promise<IPessoasEnderecosDTO[]>;
}

export { IPessoasEnderecosRepository };
