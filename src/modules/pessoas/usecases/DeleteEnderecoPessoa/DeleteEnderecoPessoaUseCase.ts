import { inject, injectable } from "tsyringe";
import { IPessoasEnderecosRepository } from "@/modules/pessoas/repositories";

@injectable()
class DeleteEnderecoPessoaUseCase {
    constructor(@inject("PessoasEnderecosRepository") private model: IPessoasEnderecosRepository) {}

    async execute(id_endereco: string): Promise<void> {
        await this.model.delete(id_endereco);
    }
}

export { DeleteEnderecoPessoaUseCase };
