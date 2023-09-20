import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Pessoas} from "@/modules/pessoas/infra/typeorm/entities/Pessoas";
import { v4 as uuidV4 } from "uuid";

@Entity("users_token")
class UsersToken {
    @PrimaryColumn()
    id?: string;

    @Column()
    refresh_token: string;

    @Column()
    id_pessoa: string;

    @ManyToOne(() => Pessoas)
    @JoinColumn({ name: "id_pessoa" })
    user: Pessoas;

    @Column()
    expires_date: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { UsersToken };
