import { IPessoasDTO } from "@/modules/pessoas/dtos/IPessoasDTO";
import { Pessoas } from "@/modules/pessoas/infra/typeorm/entities/Pessoas";

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

interface IPessoasRepository {
    create(data: IPessoasDTO): Promise<void>;
    insertGetId(data: IPessoasDTO): Promise<string>;
    edit(id_pessoa: string, data: IRequest): Promise<void>;
    delete(id_pessoa: string): Promise<void>;
    list(): Promise<Pessoas[]>;
    search(id_pessoa): Promise<Pessoas>;
    findByEmail(email: string): Promise<Pessoas>;
    findByCPF(cpf: string): Promise<Pessoas>;
    findByRG(rg: string): Promise<Pessoas>;
    updateAvatar(id_pessoa: string, avatar: string): Promise<void>;
}

export { IPessoasRepository };
