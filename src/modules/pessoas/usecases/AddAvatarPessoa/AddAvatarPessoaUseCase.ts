import { IStorage } from "@/shared/container/providers/Interface";
import { inject, injectable } from "tsyringe";
import { IPessoasRepository } from "@/modules/pessoas/repositories";
import { AppError } from "@/shared/errors/AppError";


@injectable()
class AddAvatarPessoaUseCase {

    constructor(
        @inject("Storage") private storage: IStorage,
        @inject("PessoasRepository") private model: IPessoasRepository,
    ) {}

    async execute(id_pessoa: string, avatar: string): Promise<void> {
        const pessoa = await this.model.search(id_pessoa);

        if (!pessoa) throw new AppError("Pessoa não existe");
        if (pessoa.avatar) await this.storage.delete(pessoa.avatar, "avatar");

        await this.storage.save(avatar, "avatar");
        await this.model.updateAvatar(id_pessoa, avatar);
    }

}

export { AddAvatarPessoaUseCase };
