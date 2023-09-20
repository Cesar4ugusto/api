import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Expose } from "class-transformer";
import { v4 as uuidV4 } from "uuid";
import { PessoasTelefones } from "./PessoasTelefones";
import { PessoasEnderecos } from "./PessoasEnderecos";

@Entity("pessoas")
class Pessoas {
    @PrimaryColumn()
    id_pessoa?: string;

    @Column()
    nome: string;

    @Column()
    nome_social: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        nullable: true,
    })
    email_alternativo: string;

    @Column({ select: false })
    senha: string;

    @Column({
        nullable: true,
    })
    avatar: string;

    @Column({
        unique: true,
        length: 11,
    })
    cpf: string;

    @Column({
        unique: true,
        length: 8,
    })
    rg: string;

    @Column()
    nome_pai: string;

    @Column()
    nome_mae: string;

    @Column({
        type: "date",
    })
    data_nascimento: Date;

    @Column({
        type: "boolean",
    })
    sexo: boolean;

    @Column({
        type: "boolean",
        default: true,
    })
    status: boolean;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @OneToMany(() => PessoasEnderecos, pessoas_enderecos => pessoas_enderecos.id_pessoa)
    enderecos: PessoasEnderecos[];

    @OneToMany(() => PessoasTelefones, pessoas_telefones => pessoas_telefones.id_pessoa)
    telefones: PessoasTelefones[];

    @Expose({ name: "avatar_url" })
    avatar_url(): string {
        switch (process.env.APP_STORAGE_DISK) {
            case "local":
                return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
            default:
                return null;
        }
    }

    constructor() {
        if (!this.id_pessoa) {
            this.id_pessoa = uuidV4();
        }
    }
}

export { Pessoas };
