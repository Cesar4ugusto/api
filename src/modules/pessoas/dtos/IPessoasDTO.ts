interface IPessoasDTO {
    id_pessoa?: string;
    nome: string;
    nome_social: string;
    email: string;
    email_alternativo: string;
    senha: string;
    avatar?: string;
    cpf: string;
    rg: string;
    nome_pai: string;
    nome_mae: string;
    data_nascimento: Date;
    sexo: boolean;
}

export { IPessoasDTO };
