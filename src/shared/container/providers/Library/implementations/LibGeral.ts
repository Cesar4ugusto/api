import moment from "moment";
import { hash, compare } from "bcryptjs";
import { ILibGeral } from "../ILibGeral";


class LibGeral implements ILibGeral {

    formatToBR(date: Date): string {
        return moment(date).format("DD/MM/YYYY");
    }

    formatToIso(date: string): Date {
        const isValidDateFormat = moment(date, "DD/MM/YYYY", true).isValid();
        if (!isValidDateFormat) throw new Error("Formato de data inválido!");

        return moment(date, "DD/MM/YYYY").toDate();
    }

    countYears(date: Date): number {
        const today = moment();
        const birthDate = moment(date);

        return today.diff(birthDate, "years");
    }

    async hashPassword(password: string): Promise<string> {
        return hash(password, 16)
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return compare(password, hash);
    }

    validaCPF(cpf: string): boolean {
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11) {
            return false;
        }

        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }

        let soma = 0;

        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }

        let resto = 11 - (soma % 11);
        let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

        soma = 0;

        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }

        resto = 11 - (soma % 11);
        let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

        if (parseInt(cpf.charAt(9)) !== digitoVerificador1 || parseInt(cpf.charAt(10)) !== digitoVerificador2) {
            return false;
        }

        return true;
    }

    validaEmail(email: string): boolean {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    validaTelefone(telefone: string): boolean {
        const DDDs = [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 87, 82, 83, 84, 85, 88, 86, 89, 98, 99, 91, 93, 94, 96, 92, 97, 95];

        telefone = telefone.replace(/\s/g, '');
        telefone = telefone.replace(/\D/g, '');

        if (/^(\d)\1+$/.test(telefone)) {

            return false;

        } else if (telefone.length < 10 || telefone.length > 11) {

            return false;

        } else if (!DDDs.includes(parseInt(telefone.substring(0, 2)))) {

            return false;

        } else if (telefone.length === 11) {

            if (telefone.charAt(2) !== "9") return false;

            telefone = telefone.substring(3);

            if (/^(\d)\1+$/.test(telefone)) {
                return false;
            }

        } else if (telefone.length === 10) {

            telefone = telefone.substring(2);

            if (/^(\d)\1+$/.test(telefone)) {
                return false;
            }

        }

        return true;
    }

    validaCEP(cep: string): boolean {
        cep = cep.replace(/\s/g, "");
        cep = cep.replace(/\D/g, "");

        if (/^(\d)\1+$/.test(cep)) {

            return false;

        } else if (cep.length !== 8) {

            return false;

        }

        return true;

    }

    requiredFields(keys: string[], values: object): boolean {
        for (const key of keys) {
            if (values[key] === undefined || values[key] === null || values[key] === "") {
                return false;
            }
        }

        return true;
    }

    apenasNumeros(text: string): string {
        return text.replace(/\D/g, "");
    }

    apenasLetras(text: string): string {
        return text.replace(/[^a-zA-Z ]/g, "");
    }

}

export { LibGeral };