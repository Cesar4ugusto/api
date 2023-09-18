import { inject, injectable } from "tsyringe";
import { IPessoasEnderecosRepository, IPessoasRepository, IPessoasTelefonesRepository } from "@/modules/pessoas/repositories";


@injectable()
class DeletePessoasUseCase {
    constructor(
        @inject("PessoasRepository")
        private model: IPessoasRepository,
        @inject("PessoasEnderecosRepository")
        private modelEndereco: IPessoasEnderecosRepository,
        @inject("PessoasTelefonesRepository")
        private modelTelefone: IPessoasTelefonesRepository,
    ) {}

    async execute({ id_pessoa }): Promise<void> {
        const pessoa = await this.model.search(id_pessoa);
        if (!pessoa) throw new Error("Usuário não encontrado!");

        await this.modelEndereco.deleteByIdPessoa(id_pessoa);
        await this.modelTelefone.deleteByIdPessoa(id_pessoa);
        await this.model.delete(id_pessoa);
    }
}

export { DeletePessoasUseCase }
