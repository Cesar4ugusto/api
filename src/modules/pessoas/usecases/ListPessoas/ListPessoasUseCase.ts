import { Pessoas } from "@/modules/pessoas/infra/typeorm/entities/Pessoas";
import { inject, injectable } from "tsyringe";
import { IPessoasRepository } from "../../repositories/IPessoasRepository";

@injectable()
class ListPessoasUseCase {

    constructor(
        @inject("PessoasRepository")
        private model: IPessoasRepository
    ) {}

    async execute(): Promise<Pessoas[]> {
        return await this.model.list();
    }

}

export { ListPessoasUseCase };
