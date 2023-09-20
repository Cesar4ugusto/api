import { Pessoas } from "@/modules/pessoas/infra/typeorm/entities/Pessoas";
import { inject, injectable } from "tsyringe";
import { IPessoasRepository } from "@/modules/pessoas/repositories";

@injectable()
class SearchPessoaUseCase {
    constructor(
        @inject("PessoasRepository")
        private model: IPessoasRepository,
    ) {}

    async execute(id_pessoa: string): Promise<Pessoas> {
        return await this.model.search(id_pessoa)
    }
}

export { SearchPessoaUseCase };
