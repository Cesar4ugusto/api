import { inject, injectable } from "tsyringe";
import { IUsersTokenRepository } from "@/modules/auth/repositories/IUsersTokenRepository";
import { IAuth, ILibGeral } from "@/shared/container/providers/Interface";
import { IPessoasRepository } from "@/modules/pessoas/repositories";
import { AppError } from "@/shared/errors/AppError";
import auth from "@/config/auth";

interface ITokenResponse {
    token: string;
    refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokenRepository") private model: IUsersTokenRepository,
        @inject("Library") private library: ILibGeral,
        @inject("Auth") private authLibrary: IAuth,
        @inject("PessoasRepository") private pessoasRepository: IPessoasRepository,
    ) {}

    async execute(refresh_token: string): Promise<ITokenResponse> {
        const { sub } = this.authLibrary.verifyRefreshToken(refresh_token);
        const id_pessoa = sub;

        const userToken = await this.model.findByUserIdAndRefreshToken(id_pessoa, refresh_token);
        if (!userToken) throw new AppError("Não existe nenhum token para este usuário!");

        await this.model.deleteById(userToken.id);

        const refreshToken = this.authLibrary.generateRefreshToken(id_pessoa);

        await this.model.create({
            id_pessoa,
            refresh_token: refreshToken,
            expires_date: this.library.addDays(auth.expires_refresh_token_days),
        });

        const token = this.authLibrary.generateToken(id_pessoa);

        return { token, refreshToken };
    }
}

export { RefreshTokenUseCase }
