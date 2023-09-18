import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Pessoas } from "./Pessoas";

@Entity("pessoas_enderecos")
class PessoasEnderecos {
    @PrimaryColumn()
    id_endereco?: string;

    @ManyToOne(() => Pessoas, pessoas => pessoas.id_pessoa)
    @JoinColumn({ name: "id_pessoa" })
    id_pessoa: string;

    @Column()
    endereco: string;

    @Column()
    numero: string;

    @Column({ nullable: true })
    complemento: string;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column({ type: "varchar", length: 2 })
    estado: string;

    @Column({ type: "varchar", length: 9 })
    cep: string;

    @Column({ type: "int" })
    endereco_tipo: number;

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
        if (!this.id_endereco) {
            this.id_endereco = uuidv4();
        }
    }
}

export { PessoasEnderecos };
