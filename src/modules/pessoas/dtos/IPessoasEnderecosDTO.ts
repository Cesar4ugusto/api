interface IPessoasEnderecosDTO {
    id_endereco?: string;
    id_pessoa: string;
    endereco: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    endereco_tipo: number;
}

export { IPessoasEnderecosDTO };
