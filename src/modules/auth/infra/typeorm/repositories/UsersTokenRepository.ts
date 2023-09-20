import { UsersTokenDTO } from "@/modules/auth/dtos/UsersTokenDTO";
import { IUsersTokenRepository } from "@/modules/auth/repositories/IUsersTokenRepository";
import { Repository, getRepository } from "typeorm";
import { UsersToken } from "@/modules/auth/infra/typeorm/entities/UsersToken";


class UsersTokenRepository implements IUsersTokenRepository {
    private repository: Repository<UsersToken>;

    constructor() {
        this.repository = getRepository(UsersToken);
    }

    async create(data: UsersTokenDTO): Promise<void> {
        const user_token = this.repository.create(data);
        await this.repository.save(user_token);
    }

    async findByUserIdAndRefreshToken(id_pessoa: string, refresh_token: string): Promise<UsersToken> {
        return await this.repository.findOne({ id_pessoa, refresh_token });
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByToken(refresh_token: string): Promise<UsersToken> {
        return await this.repository.findOne({ refresh_token });
    }
}

export { UsersTokenRepository };
