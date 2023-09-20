interface IPayloadToken {
    sub: string;
}

interface IPayloadRefreshToken {
    sub: string;
    email: string;
}

interface ILibGeral {
    formatToBR(date: Date): string;
    formatToIso(date: string): Date;
    addDays(days: number): Date;
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
    generateUUID(): string;
    addHours(hours: number): Date;
}

interface IStorage {
    save(file: string, folder: string): Promise<string>;
    delete(file: string, folder: string): Promise<void>;
}

interface IAuth {
    generateToken(id: string): string;
    verifyToken(token: string): IPayloadToken;
    generateRefreshToken(id: string): string;
    verifyRefreshToken(token: string): IPayloadRefreshToken;
}

interface IMail {
    sendMail(to: string, subject: string, variables: any, path: string): Promise<void>;
}

export { IAuth, ILibGeral, IMail, IStorage };
