import { inject, injectable } from "tsyringe";
import { IUsersTokenRepository } from "@/modules/auth/repositories/IUsersTokenRepository";
import { IPessoasRepository } from "@/modules/pessoas/repositories";
import { ILibGeral } from "@/shared/container/providers/Interface";
import { AppError } from "@/shared/errors/AppError";

@injectable()
class ResetPasswordUseCase {

    constructor(
        @inject("UsersTokenRepository") private model: IUsersTokenRepository,
        @inject("PessoasRepository") private pessoas: IPessoasRepository,
        @inject("Library") private library: ILibGeral,
    ) {}

    async execute(token: string, senha: string, confirmation: string): Promise<void> {
        console.log(senha !== confirmation)
        const userToken = await this.model.findByToken(token);
        if (!userToken) throw new AppError("Token invalido");

        const user = await this.pessoas.resetPassword(userToken.id_pessoa);
        if (!user) throw new AppError("Usuário não existe");

        if (senha !== confirmation) throw new AppError("As senhas não conferem");

        if (await this.library.comparePassword(senha, user.senha)) throw new AppError("A nova senha não pode ser igual a anterior");

        if (this.library.compareIfBefore(userToken.expires_date, this.library.dateNow())) throw new AppError("O token de recuperação de senha expirou!");

        user.senha = await this.library.hashPassword(senha);

        await this.pessoas.create(user);

        await this.model.deleteById(userToken.id);
    }

}

export { ResetPasswordUseCase };
