interface ILibGeral {
    formatToBR(date: Date): string;
    formatToIso(date: string): Date;
    countYears(date: Date): number;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    validaCPF(cpf: string): boolean;
    validaEmail(email: string): boolean;
    validaTelefone(telefone: string): boolean;
    validaCEP(cep: string): boolean;
    requiredFields(keys: string[], values: object): boolean;
    apenasNumeros(value: string): string;
    apenasLetras(value: string): string;
}

export { ILibGeral };
