import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Pessoas } from "./Pessoas";

@Entity("pessoas_telefones")
class PessoasTelefones {
    @PrimaryColumn()
    id_telefone?: string;

    @ManyToOne(() => Pessoas, (pessoas) => pessoas.id_pessoa)
    @JoinColumn({ name: "id_pessoa" })
    id_pessoa: string;

    @Column({ type: "varchar", length: 11 })
    telefone: string;

    @Column({ type: "int" })
    telefone_tipo: number;

    @Column({
        type: "boolean",
        default: true,
    })
    status: boolean;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    constructor() {
        if (!this.id_telefone) {
            this.id_telefone = uuidV4();
        }
    }
}

export { PessoasTelefones };
