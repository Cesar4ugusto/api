import { inject, injectable } from "tsyringe";
import { IPessoasRepository } from "@/modules/pessoas/repositories";
import { IAuth, ILibGeral } from "@/shared/container/providers/Library/Interface";
import { AppError } from "@/shared/errors/AppError";
import auth from "@/config/auth";
import { IUsersTokenRepository } from "@/modules/auth/repositories/IUsersTokenRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUseCase {

    constructor(
        @inject("PessoasRepository") private model: IPessoasRepository,
        @inject("Auth") private auth: IAuth,
        @inject("Library") private library: ILibGeral,
        @inject("UsersTokenRepository") private usersTokenRepository: IUsersTokenRepository,
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.model.findByEmail(email);
        if (!user) throw new AppError("Email ou Senha incorretos!");

        if (!await this.library.comparePassword(password, user.senha)) throw new AppError("Email ou Senha incorretos!");

        const token = this.auth.generateToken(user.id_pessoa);
        const refresh_token = this.auth.generateRefreshToken(user.id_pessoa);

        await this.usersTokenRepository.create({
            id_pessoa: user.id_pessoa,
            refresh_token,
            expires_date: this.library.addDays(auth.expires_refresh_token_days),
        });

        return {
            user: {
                name: user.nome,
                email: user.email,
            },
            token,
            refresh_token,
        }
    }
}

export { AuthenticateUseCase };
