import { inject, injectable } from "tsyringe";
import { IPessoasTelefonesRepository } from "@/modules/pessoas/repositories";

@injectable()
class DeleteTelefonePessoaUseCase {

    constructor(
        @inject("PessoasTelefonesRepository") private model: IPessoasTelefonesRepository,
    ) {}

    async execute(id_telefone: string): Promise<void> {
        await this.model.delete(id_telefone);
    }

}

export { DeleteTelefonePessoaUseCase };
