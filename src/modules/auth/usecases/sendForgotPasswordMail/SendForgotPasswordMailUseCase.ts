import { inject, injectable } from "tsyringe";
import { IUsersTokenRepository } from "@/modules/auth/repositories/IUsersTokenRepository";
import { ILibGeral, IMail } from "@/shared/container/providers/Interface";
import { IPessoasRepository } from "@/modules/pessoas/repositories";
import { resolve } from "path";
import { AppError } from "@/shared/errors/AppError";


@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersTokenRepository") private model: IUsersTokenRepository,
        @inject("Library") private lib: ILibGeral,
        @inject("Mail") private mail: IMail,
        @inject("PessoasRepository") private pessoas: IPessoasRepository,
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.pessoas.findByEmail(email);
        if (!user) throw new AppError("Usuário não existe!");

        const token = this.lib.generateUUID();

        await this.model.create({
            refresh_token: token,
            id_pessoa: user.id_pessoa,
            expires_date: this.lib.addHours(3),
        });

        const path = resolve(__dirname, "..", "..", "..", "..", "shared", "views", "forgotPassword.hbs");

        const variables = {
            name: user.nome,
            link: `${process.env.FORGOT_MAIL_URL}${token}`,
        };

        await this.mail.sendMail(email, "Solicitação de Recuperação de senha | Dev Planet", variables, path);
    }
}

export { SendForgotPasswordMailUseCase };
