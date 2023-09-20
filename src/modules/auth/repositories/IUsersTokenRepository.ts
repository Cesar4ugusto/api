import { UsersTokenDTO } from "@/modules/auth/dtos/UsersTokenDTO";
import { UsersToken } from "@/modules/auth/infra/typeorm/entities/UsersToken";

interface IUsersTokenRepository {
    create(data: UsersTokenDTO): Promise<void>;
    findByUserIdAndRefreshToken(id_pessoa: string, refresh_token: string): Promise<UsersToken>;
    deleteById(id: string): Promise<void>;
    findByToken(refresh_token: string): Promise<UsersToken>;
}

export { IUsersTokenRepository };
